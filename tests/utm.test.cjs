const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { buildSchema, graphql, parse, validate } = require('graphql');

const source = fs.readFileSync(path.join(__dirname, '../src/components/marketing/utm/common.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const mod = { exports: {} };
vm.runInNewContext(compiled, { module: mod, exports: mod.exports, URL });
const { generateUTM, getUTMFormValues, buildUTMInput } = mod.exports;
const fields = {
  url: 'https://www.diemex.in/register?t=exhibitor',
  source: 'facebook', medium: 'social media', campaign: 'fb_sale',
  term: 'tooling', content: 'banner',
};

const schema = buildSchema(fs.readFileSync(path.join(__dirname, '../../cms-backend/src/schema.gql'), 'utf8'));

test('the reported exhibitor link retains the tab and all five UTM values', () => {
  const result = generateUTM(fields);
  assert.equal(result, 'https://www.diemex.in/register?t=exhibitor&utm_source=facebook&utm_medium=social+media&utm_campaign=fb_sale&utm_term=tooling&utm_content=banner');
  const parsed = new URL(result);
  assert.equal(parsed.searchParams.get('t'), 'exhibitor');
  for (const key of ['source', 'medium', 'campaign', 'term', 'content']) {
    assert.equal(parsed.searchParams.get(`utm_${key}`), fields[key]);
  }
});

test('visitor links and other existing parameters keep their values', () => {
  const parsed = new URL(generateUTM({ ...fields, url: 'https://www.diemex.in/register?t=visitor&return=AbC%2FDef&tag=a&tag=b#FormSection' }));
  assert.equal(parsed.searchParams.get('t'), 'visitor');
  assert.equal(parsed.searchParams.get('return'), 'AbC/Def');
  assert.deepEqual(parsed.searchParams.getAll('tag'), ['a', 'b']);
  assert.equal(parsed.hash, '#FormSection');
});

test('links without an existing query use one question mark and preserve case-sensitive paths', () => {
  const result = generateUTM({ ...fields, url: 'https://example.test/Register/AbC#Apply' });
  assert.equal(result.split('?').length, 2);
  assert.equal(new URL(result).pathname, '/Register/AbC');
  assert.equal(new URL(result).hash, '#Apply');
});

test('editing replaces old UTM values and removes cleared optional parameters', () => {
  const parsed = new URL(generateUTM({
    ...fields,
    url: 'https://www.diemex.in/register?t=exhibitor&utm_source=old&utm_source=duplicate&utm_term=old&utm_content=old',
    term: '   ', content: null,
  }));
  assert.deepEqual(parsed.searchParams.getAll('utm_source'), ['facebook']);
  assert.equal(parsed.searchParams.has('utm_term'), false);
  assert.equal(parsed.searchParams.has('utm_content'), false);
  assert.equal(parsed.searchParams.get('t'), 'exhibitor');
});

test('empty and invalid website URLs do not produce copyable tracking links', () => {
  for (const url of ['', 'not a URL', 'javascript:alert(1)', 'ftp://example.test/file']) {
    assert.equal(generateUTM({ ...fields, url }), '');
  }
});

test('preview and saved tags normalize consistently without changing the website URL', () => {
  const values = { ...fields, source: ' Facebook ', medium: ' Social Media ', campaign: ' FB_Sale ', term: ' TOOLING ', content: ' Banner ' };
  const input = buildUTMInput(values, 'project-1');
  const parsed = new URL(generateUTM(values));
  for (const key of ['source', 'medium', 'campaign', 'term', 'content']) {
    assert.equal(parsed.searchParams.get(`utm_${key}`), input[key]);
  }
  assert.equal(input.url, fields.url);
});

test('editing strips response metadata and retains only the explicitly selected record ID', async () => {
  const record = { ...fields, id: 'utm-1', projectId: 'project-1', __typename: 'Utm', createdAt: '2026-10-28T12:10:50.419Z', leadCount: 0, uniqueLeadCount: 0 };
  const values = getUTMFormValues(record);
  assert.deepEqual(Object.keys(values).sort(), ['url', 'source', 'medium', 'campaign', 'term', 'content'].sort());
  const input = buildUTMInput({ ...values, ...record }, 'project-1', record.id);
  assert.equal(input.id, 'utm-1');
  assert.equal(Object.hasOwn(input, '__typename'), false);
  assert.equal(Object.hasOwn(input, 'createdAt'), false);
  assert.equal(Object.hasOwn(input, 'leadCount'), false);
  const result = await graphql({
    schema,
    source: fs.readFileSync(path.join(__dirname, '../src/graphql/mutations/createUtm.graphql'), 'utf8'),
    variableValues: { input },
    rootValue: { createUtm: ({ input: received }) => ({ url: received.url }) },
  });
  assert.equal(result.errors, undefined);
  assert.equal(result.data.createUtm.url, fields.url);
});

test('new forms start empty, creates omit an edit ID, and clearing optional fields persists null', () => {
  assert.ok(Object.values(getUTMFormValues()).every((value) => value === ''));
  const input = buildUTMInput({ ...fields, term: '', content: '  ' }, 'project-1');
  assert.equal(Object.hasOwn(input, 'id'), false);
  assert.equal(input.term, null);
  assert.equal(input.content, null);
  assert.equal(getUTMFormValues({ ...fields, term: null, content: null }).term, '');
});

test('dashboard and delete GraphQL operations match the backend schema', () => {
  for (const file of ['queries/getUtmByProjectId.graphql', 'mutations/deleteUtm.graphql']) {
    const document = parse(fs.readFileSync(path.join(__dirname, '../src/graphql', file), 'utf8'));
    assert.deepEqual(validate(schema, document).map((error) => error.message), []);
  }
});

// Exercise the parent component's edit/add callbacks with Formik's reset baseline
// behavior, so an edit cannot become the initial values for the next Add action.
function componentFixture() {
  const React = require('react');
  const Button = () => null;
  const Dashboard = () => null;
  const Modal = () => null;
  let editingItem = null;
  let formik;
  let submit;
  let failSave = false;
  const saves = [];
  const modal = { isOpen: false, openModal() { this.isOpen = true; }, closeModal() { this.isOpen = false; } };
  const mocks = {
    react: { ...React, useState: (initial) => [editingItem ?? initial, (value) => { editingItem = value; }] },
    '../../ui/button/Button': Button,
    '../../common/PageBreadCrumb': () => null,
    './utmDashboard': Dashboard,
    './utmModal': Modal,
    './common': mod.exports,
    '@/hooks/useModal': { useModal: () => modal },
    'react-redux': { useSelector: (selector) => selector({ project: { projectId: 'project-1', projectName: 'Test' } }) },
    '@/gql_generated/graphql': { CreateUtmDocument: {}, GetUtmByProjectIdDocument: {}, LeadScalarFieldEnum: { UtmSource: 'utmSource' } },
    '@apollo/client': { useMutation: () => [async (request) => {
      saves.push(request);
      if (failSave) throw new Error('Save failed');
      return { data: { createUtm: { url: request.variables.input.url } } };
    }] },
    formik: { useFormik: (config) => {
      submit = config.onSubmit;
      if (!formik) {
        let initial = config.initialValues;
        formik = {
          values: { ...initial }, isSubmitting: false,
          resetForm(options) {
            if (options?.values) initial = options.values;
            this.values = { ...initial };
            this.status = undefined;
          },
          setStatus(status) { this.status = status; },
        };
      }
      return formik;
    } },
  };
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/components/marketing/utm/utmComponent.tsx'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const component = { exports: {} };
  vm.runInNewContext(code, {
    module: component, exports: component.exports, Error,
    require: (name) => Object.hasOwn(mocks, name) ? mocks[name] : require(name),
  });
  function find(node, type) {
    if (!node) return;
    if (Array.isArray(node)) return node.map((child) => find(child, type)).find(Boolean);
    if (node.type === type) return node;
    return find(node.props?.children, type);
  }
  const render = () => component.exports.default();
  return {
    saves, modal,
    get formik() { return formik; },
    edit(entry) { find(render(), Dashboard).props.onEdit(entry); render(); },
    add() { find(render(), Button).props.onClick(); render(); },
    cancel() { find(render(), Modal).props.modal.closeModal(); render(); },
    save(values) { render(); formik.values = values; return submit(values, formik); },
    failNextSave() { failSave = true; },
  };
}

test('editing then adding uses a blank form and never reuses the edited record ID', async () => {
  const app = componentFixture();
  app.edit({ ...fields, id: 'utm-1', __typename: 'Utm', createdAt: '2026-10-28' });
  await app.save({ ...app.formik.values, campaign: 'updated_sale' });
  assert.equal(app.saves[0].variables.input.id, 'utm-1');
  assert.equal(app.saves[0].variables.input.campaign, 'updated_sale');
  assert.equal(Object.hasOwn(app.saves[0].variables.input, '__typename'), false);
  assert.equal(app.modal.isOpen, false);
  app.add();
  assert.ok(Object.values(app.formik.values).every((value) => value === ''));
  await app.save({ ...fields, campaign: 'new_sale' });
  assert.equal(Object.hasOwn(app.saves[1].variables.input, 'id'), false);
});

test('cancelling an edit clears its values before the next Add', () => {
  const app = componentFixture();
  app.edit({ ...fields, id: 'utm-1' });
  app.cancel();
  app.add();
  assert.ok(Object.values(app.formik.values).every((value) => value === ''));
});

test('a failed edit keeps the entered values and reports the error in the open form', async () => {
  const app = componentFixture();
  app.edit({ ...fields, id: 'utm-1' });
  app.failNextSave();
  await app.save({ ...app.formik.values, campaign: 'retry_sale' });
  assert.equal(app.formik.status, 'Save failed');
  assert.equal(app.formik.values.campaign, 'retry_sale');
  assert.equal(app.modal.isOpen, true);
});
