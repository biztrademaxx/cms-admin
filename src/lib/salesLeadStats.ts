import { LeadStatus } from "@/gql_generated/graphql";

const IN_PROGRESS: LeadStatus[] = [
  LeadStatus.Contacted,
  LeadStatus.NoResponse,
  LeadStatus.Callback,
  LeadStatus.FollowUp,
  LeadStatus.Busy,
  LeadStatus.SendDetails,
];

const CONVERTED: LeadStatus[] = [LeadStatus.Converted, LeadStatus.Sold];

export function summarizeAssignedLeads(
  leads: { status: LeadStatus }[]
): {
  total: number;
  newLeads: number;
  inProgress: number;
  converted: number;
  conversionRate: number;
} {
  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === LeadStatus.New).length;
  const inProgress = leads.filter((l) => IN_PROGRESS.includes(l.status)).length;
  const converted = leads.filter((l) => CONVERTED.includes(l.status)).length;
  const conversionRate = total ? Math.round((converted / total) * 100) : 0;
  return { total, newLeads, inProgress, converted, conversionRate };
}
