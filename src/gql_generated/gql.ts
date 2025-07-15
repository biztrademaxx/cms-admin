/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}": typeof types.CreateProjectDocument,
    "mutation CreateUtm($input: CreateUTMInput!) {\n  createUtm(input: $input) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n  }\n}": typeof types.CreateUtmDocument,
    "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    companyName\n    createdAt\n    description\n    id\n    linkedin\n    logoUrl\n    projectId\n    updatedAt\n    website\n  }\n}": typeof types.GetExhibitorsByProjectDocument,
    "query GetUtmBySlug($slug: String!) {\n  getUtmByProject(slug: $slug) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n    url\n  }\n}": typeof types.GetUtmBySlugDocument,
    "query Project($slug: String!) {\n  project(slug: $slug) {\n    id\n    name\n    description\n  }\n}": typeof types.ProjectDocument,
    "query Projects {\n  projects {\n    id\n    name\n    slug\n    description\n    startDate\n    endDate\n  }\n}": typeof types.ProjectsDocument,
};
const documents: Documents = {
    "mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}": types.CreateProjectDocument,
    "mutation CreateUtm($input: CreateUTMInput!) {\n  createUtm(input: $input) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n  }\n}": types.CreateUtmDocument,
    "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    companyName\n    createdAt\n    description\n    id\n    linkedin\n    logoUrl\n    projectId\n    updatedAt\n    website\n  }\n}": types.GetExhibitorsByProjectDocument,
    "query GetUtmBySlug($slug: String!) {\n  getUtmByProject(slug: $slug) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n    url\n  }\n}": types.GetUtmBySlugDocument,
    "query Project($slug: String!) {\n  project(slug: $slug) {\n    id\n    name\n    description\n  }\n}": types.ProjectDocument,
    "query Projects {\n  projects {\n    id\n    name\n    slug\n    description\n    startDate\n    endDate\n  }\n}": types.ProjectsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}"): (typeof documents)["mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateUtm($input: CreateUTMInput!) {\n  createUtm(input: $input) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n  }\n}"): (typeof documents)["mutation CreateUtm($input: CreateUTMInput!) {\n  createUtm(input: $input) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    companyName\n    createdAt\n    description\n    id\n    linkedin\n    logoUrl\n    projectId\n    updatedAt\n    website\n  }\n}"): (typeof documents)["query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    companyName\n    createdAt\n    description\n    id\n    linkedin\n    logoUrl\n    projectId\n    updatedAt\n    website\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetUtmBySlug($slug: String!) {\n  getUtmByProject(slug: $slug) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n    url\n  }\n}"): (typeof documents)["query GetUtmBySlug($slug: String!) {\n  getUtmByProject(slug: $slug) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n    url\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Project($slug: String!) {\n  project(slug: $slug) {\n    id\n    name\n    description\n  }\n}"): (typeof documents)["query Project($slug: String!) {\n  project(slug: $slug) {\n    id\n    name\n    description\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Projects {\n  projects {\n    id\n    name\n    slug\n    description\n    startDate\n    endDate\n  }\n}"): (typeof documents)["query Projects {\n  projects {\n    id\n    name\n    slug\n    description\n    startDate\n    endDate\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;