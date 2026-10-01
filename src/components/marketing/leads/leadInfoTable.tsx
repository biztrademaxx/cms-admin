"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import {
  GetLeadByIdDocument,
  LeadSource,
  LeadStatus,
  LeadType,
  UpdateLeadDetailsDocument,
} from "@/gql_generated/graphql";
import {
  getLeadTypeLabel,
  getSourceLabel,
  getStatusColor,
  getStatusLabel,
} from "./leadStatusConfig";
import { convertISOtoNormal } from "@/utils/dateUtils";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";

interface LeadInfo {
  id: string;
  name: string;
  email: string;
  additionalEmails?: string[] | null;
  phone?: string | null;
  additionalPhones?: string[] | null;
  companyName?: string | null;
  jobTitle?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  industry?: string | null;
  message?: string | null;
  notes?: string | null;
  source: LeadSource;
  status?: LeadStatus | null;
  leadType?: LeadType | null;
  createdAt: string;
  updatedAt?: string | null;
  assignedTo?: { name?: string | null } | null;
  utm?: {
    source?: string | null;
    medium?: string | null;
    campaign?: string | null;
  } | null;
}

interface LeadInfoTableProps {
  lead: LeadInfo;
  mode: "sales" | "admin";
}

const inputClass =
  "h-9 w-full rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function listValues(primary?: string | null, extras?: string[] | null) {
  return [primary, ...(extras ?? [])].map((value) => value?.trim() || "").filter(Boolean);
}

const LeadInfoTable: React.FC<LeadInfoTableProps> = ({ lead, mode }) => {
  const isAdmin = mode === "admin";
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState(lead.name);
  const [emails, setEmails] = useState<string[]>([lead.email]);
  const [phones, setPhones] = useState<string[]>([""]);
  const [jobTitle, setJobTitle] = useState(lead.jobTitle || "");
  const [companyName, setCompanyName] = useState(lead.companyName || "");
  const [city, setCity] = useState(lead.city || "");
  const [stateName, setStateName] = useState(lead.state || "");
  const [country, setCountry] = useState(lead.country || "");
  const [industry, setIndustry] = useState(lead.industry || "");
  const [message, setMessage] = useState(lead.message || "");
  const [notes, setNotes] = useState(lead.notes || "");

  const resetForm = () => {
    setName(lead.name || "");
    setEmails(listValues(lead.email, lead.additionalEmails));
    const phoneValues = listValues(lead.phone, lead.additionalPhones);
    setPhones(phoneValues.length ? phoneValues : [""]);
    setJobTitle(lead.jobTitle || "");
    setCompanyName(lead.companyName || "");
    setCity(lead.city || "");
    setStateName(lead.state || "");
    setCountry(lead.country || "");
    setIndustry(lead.industry || "");
    setMessage(lead.message || "");
    setNotes(lead.notes || "");
    setError("");
  };

  useEffect(() => {
    if (!editing) resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lead.id,
    lead.name,
    lead.email,
    lead.phone,
    lead.jobTitle,
    lead.companyName,
    lead.city,
    lead.state,
    lead.country,
    lead.industry,
    lead.message,
    lead.notes,
    (lead.additionalEmails ?? []).join("|"),
    (lead.additionalPhones ?? []).join("|"),
    editing,
  ]);

  const [updateDetails, { loading }] = useMutation(UpdateLeadDetailsDocument, {
    refetchQueries: [{ query: GetLeadByIdDocument, variables: { id: lead.id } }],
    onCompleted: () => {
      setEditing(false);
      setError("");
    },
    onError: (mutationError) => setError(mutationError.message),
  });

  const updateList = (
    values: string[],
    index: number,
    value: string,
    setter: (next: string[]) => void,
  ) => {
    const next = [...values];
    next[index] = value;
    setter(next);
  };

  const removeListItem = (
    values: string[],
    index: number,
    setter: (next: string[]) => void,
  ) => {
    setter(values.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSave = () => {
    const cleanedEmails = emails.map((value) => value.trim()).filter(Boolean);
    const cleanedPhones = phones.map((value) => value.trim()).filter(Boolean);
    const primaryEmail = isAdmin ? cleanedEmails[0] : lead.email;
    const extraEmails = cleanedEmails
      .slice(1)
      .filter((value) => value.toLowerCase() !== primaryEmail.toLowerCase());

    if (!primaryEmail || !emailPattern.test(primaryEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (extraEmails.some((value) => !emailPattern.test(value))) {
      setError("Each extra email must be a valid email address.");
      return;
    }
    if (isAdmin && !name.trim()) {
      setError("Name is required.");
      return;
    }

    setError("");
    updateDetails({
      variables: {
        input: {
          id: lead.id,
          salesOnly: !isAdmin,
          name: isAdmin ? name.trim() : undefined,
          email: isAdmin ? primaryEmail : undefined,
          phone: cleanedPhones[0] || "",
          additionalPhones: cleanedPhones.slice(1),
          additionalEmails: [...new Set(extraEmails)],
          jobTitle: jobTitle.trim(),
          companyName: isAdmin ? companyName.trim() : undefined,
          city: isAdmin ? city.trim() : undefined,
          state: isAdmin ? stateName.trim() : undefined,
          country: isAdmin ? country.trim() : undefined,
          industry: isAdmin ? industry.trim() : undefined,
          message: isAdmin ? message.trim() : undefined,
          notes: isAdmin ? notes.trim() : undefined,
        },
      },
    });
  };

  const viewEmails = listValues(lead.email, lead.additionalEmails);
  const viewPhones = listValues(lead.phone, lead.additionalPhones);

  const emailEditor = (
    <ValueList
      values={emails}
      type="email"
      placeholder="Email address"
      addLabel="Add email"
      lockFirst={!isAdmin}
      onChange={(index, value) => updateList(emails, index, value, setEmails)}
      onAdd={() => setEmails((current) => [...current, ""])}
      onRemove={(index) => removeListItem(emails, index, setEmails)}
    />
  );

  const phoneEditor = (
    <ValueList
      values={phones}
      type="tel"
      placeholder="Phone number"
      addLabel="Add phone"
      onChange={(index, value) => updateList(phones, index, value, setPhones)}
      onAdd={() => setPhones((current) => [...current, ""])}
      onRemove={(index) => removeListItem(phones, index, setPhones)}
    />
  );

  const rows: { label: string; value: React.ReactNode }[] = [
    ...(isAdmin
      ? [
          {
            label: "Name",
            value: editing ? (
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              lead.name
            ),
          },
          { label: "Lead Owner", value: lead.assignedTo?.name || "Unassigned" },
        ]
      : []),
    {
      label: "Email",
      value: editing ? emailEditor : <ContactLinks values={viewEmails} kind="email" />,
    },
    {
      label: "Phone",
      value: editing ? phoneEditor : <ContactLinks values={viewPhones} kind="phone" />,
    },
    {
      label: "Designation",
      value: editing ? (
        <input
          className={inputClass}
          value={jobTitle}
          placeholder="Designation"
          onChange={(e) => setJobTitle(e.target.value)}
        />
      ) : (
        lead.jobTitle || "—"
      ),
    },
    fieldRow("Company", lead.companyName, editing && isAdmin, companyName, setCompanyName),
    fieldRow("City", lead.city, editing && isAdmin, city, setCity),
    fieldRow("State", lead.state, editing && isAdmin, stateName, setStateName),
    ...(isAdmin ? [fieldRow("Country", lead.country, editing, country, setCountry)] : []),
    fieldRow("Industry", lead.industry, editing && isAdmin, industry, setIndustry),
    ...(isAdmin && lead.status
      ? [{ label: "Lead Status", value: <Badge size="sm" color={getStatusColor(lead.status)}>{getStatusLabel(lead.status)}</Badge> }]
      : []),
    { label: "Source", value: getSourceLabel(lead.source) },
    ...(isAdmin && lead.leadType
      ? [{ label: "Lead Type", value: getLeadTypeLabel(lead.leadType) }]
      : []),
    ...(isAdmin && lead.utm?.source ? [{ label: "UTM Source", value: lead.utm.source }] : []),
    ...(isAdmin && lead.utm?.campaign ? [{ label: "UTM Campaign", value: lead.utm.campaign }] : []),
    ...(isAdmin && lead.utm?.medium ? [{ label: "UTM Medium", value: lead.utm.medium }] : []),
    { label: "Created", value: convertISOtoNormal(lead.createdAt) },
    ...(isAdmin
      ? [{ label: "Last Updated", value: lead.updatedAt ? convertISOtoNormal(lead.updatedAt) : "—" }]
      : []),
    fieldRow("Message", lead.message, editing && isAdmin, message, setMessage, true),
    ...(isAdmin || lead.notes
      ? [fieldRow("Notes", lead.notes, editing && isAdmin, notes, setNotes, true)]
      : []),
  ].filter((row) => row.value !== null);

  return (
    <div>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Lead Information
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {isAdmin
              ? "Edit any detail for this lead."
              : "Add more phone numbers and emails, and update designation."}
          </p>
        </div>
        {!editing ? (
          <Button size="sm" variant="outline" onClick={() => setEditing(true)} startIcon={<Pencil className="w-4 h-4" />}>
            {isAdmin ? "Edit details" : "Edit"}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                resetForm();
                setEditing(false);
              }}
              startIcon={<X className="w-4 h-4" />}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={loading} startIcon={<Check className="w-4 h-4" />}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase w-36">
                Field
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                <td className="px-4 py-3 text-xs font-medium text-gray-500 align-top">{row.label}</td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
};

function fieldRow(
  label: string,
  current: string | null | undefined,
  editable: boolean,
  draft: string,
  setDraft: (value: string) => void,
  multiline = false,
) {
  if (!editable && !current) return { label, value: null };
  return {
    label,
    value: editable ? (
      multiline ? (
        <textarea
          value={draft}
          rows={3}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      ) : (
        <input className={inputClass} value={draft} onChange={(e) => setDraft(e.target.value)} />
      )
    ) : (
      current
    ),
  };
}

function ContactLinks({ values, kind }: { values: string[]; kind: "email" | "phone" }) {
  if (!values.length) return <span className="text-gray-400">—</span>;
  return (
    <div className="space-y-1">
      {values.map((value, index) =>
        kind === "email" ? (
          <a key={`${value}-${index}`} href={`mailto:${value}`} className="block text-blue-600 hover:underline">
            {value}
          </a>
        ) : (
          <a key={`${value}-${index}`} href={`tel:${value}`} className="block text-blue-600 hover:underline">
            {value}
          </a>
        ),
      )}
    </div>
  );
}

function ValueList({
  values,
  type,
  placeholder,
  addLabel,
  lockFirst = false,
  onChange,
  onAdd,
  onRemove,
}: {
  values: string[];
  type: string;
  placeholder: string;
  addLabel: string;
  lockFirst?: boolean;
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="space-y-2">
      {values.map((value, index) => (
        <div key={`${type}-${index}`} className="flex items-center gap-2">
          <input
            type={type}
            value={value}
            disabled={lockFirst && index === 0}
            placeholder={placeholder}
            onChange={(e) => onChange(index, e.target.value)}
            className={`${inputClass} disabled:bg-gray-100 disabled:text-gray-500 dark:disabled:bg-gray-800`}
          />
          {!(lockFirst && index === 0) && values.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={`Remove ${placeholder.toLowerCase()}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
      >
        <Plus className="w-3.5 h-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

export default LeadInfoTable;
