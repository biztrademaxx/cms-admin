export const ADMIN_LEAD_PAGE_SIZE = 15;

export type AdminLeadListQuery = {
  page: number;
  letter: string;
  search: string;
  state: string;
  city: string;
  status: string;
  source: string;
  leadType: string;
  assignedToId: string;
};

type ParamReader = { get(name: string): string | null };

export function readAdminLeadListQuery(params: ParamReader): AdminLeadListQuery {
  const rawPage = Number(params.get("page"));
  const letterRaw = (params.get("letter") ?? "").trim().toUpperCase();
  const letter = letterRaw === "#" || /^[A-Z]$/.test(letterRaw) ? letterRaw : "";

  return {
    page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
    letter,
    search: params.get("q") ?? "",
    state: params.get("state") ?? "",
    city: params.get("city") ?? "",
    status: params.get("status") ?? "",
    source: params.get("source") ?? "",
    leadType: params.get("type") ?? "",
    assignedToId: params.get("owner") ?? "",
  };
}

export function toAdminLeadListSearch(query: AdminLeadListQuery) {
  const params = new URLSearchParams();
  if (query.page > 1) params.set("page", String(query.page));
  if (query.letter) params.set("letter", query.letter);
  if (query.search) params.set("q", query.search);
  if (query.state) params.set("state", query.state);
  if (query.city) params.set("city", query.city);
  if (query.status) params.set("status", query.status);
  if (query.source) params.set("source", query.source);
  if (query.leadType) params.set("type", query.leadType);
  if (query.assignedToId) params.set("owner", query.assignedToId);
  return params;
}

export function adminLeadListPath(query: AdminLeadListQuery) {
  const search = toAdminLeadListSearch(query).toString();
  return search ? `/projects/marketing/leads?${search}` : "/projects/marketing/leads";
}

export function adminLeadDetailPath(id: string, query: AdminLeadListQuery) {
  const search = toAdminLeadListSearch(query).toString();
  return search ? `/projects/marketing/leads/${id}?${search}` : `/projects/marketing/leads/${id}`;
}
