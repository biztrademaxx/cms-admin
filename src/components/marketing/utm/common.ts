import type { CreateUtmInput } from "@/gql_generated/graphql";
import type { GenerateUTMProps, UTMFormValues } from "./utm.types";

export const isValidUTMUrl = (value: string) => {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

export const generateUTM = (values: GenerateUTMProps) => {
  if (!isValidUTMUrl(values.url)) return "";

  const url = new URL(values.url.trim());
  const fields = ["source", "medium", "campaign", "term", "content"] as const;
  for (const field of fields) {
    const value = values[field]?.trim().toLowerCase();
    if (value) url.searchParams.set(`utm_${field}`, value);
    else url.searchParams.delete(`utm_${field}`);
  }
  return url.toString();
};

// Keep API metadata out of the editable form and mutation input.
export const getUTMFormValues = (entry?: GenerateUTMProps): UTMFormValues => ({
  url: entry?.url ?? "",
  source: entry?.source ?? "",
  medium: entry?.medium ?? "",
  campaign: entry?.campaign ?? "",
  term: entry?.term ?? "",
  content: entry?.content ?? "",
});

export const buildUTMInput = (
  values: UTMFormValues,
  projectId: string,
  id?: string,
): CreateUtmInput => ({
  ...(id ? { id } : {}),
  projectId,
  url: values.url.trim(),
  source: values.source.trim().toLowerCase(),
  medium: values.medium.trim().toLowerCase(),
  campaign: values.campaign.trim().toLowerCase(),
  term: values.term.trim().toLowerCase() || null,
  content: values.content.trim().toLowerCase() || null,
});
