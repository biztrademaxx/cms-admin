import { LeadStatus } from "@/gql_generated/graphql";

export interface SalesPersonPerformanceData {
  salesPersonId: string;
  name: string;
  email: string;
  totalLeads: number;
  newLeads: number;
  inProgress: number;
  interested: number;
  converted: number;
  notInterested: number;
  conversionRate: number;
  statusBreakdown: { status: LeadStatus; count: number }[];
}

const IN_PROGRESS: LeadStatus[] = [
  LeadStatus.Contacted,
  LeadStatus.NoResponse,
  LeadStatus.Callback,
  LeadStatus.FollowUp,
  LeadStatus.Busy,
  LeadStatus.SendDetails,
];

const INTERESTED: LeadStatus[] = [LeadStatus.Interested, LeadStatus.Hot];
const CONVERTED: LeadStatus[] = [LeadStatus.Converted, LeadStatus.Sold];
const LOST: LeadStatus[] = [LeadStatus.NotInterested, LeadStatus.Cold];

export function computeSalesPersonPerformance(
  salesPerson: { id: string; name: string; email: string },
  leads: { status: LeadStatus; assignedToId?: string | null }[]
): SalesPersonPerformanceData {
  const assigned = leads.filter((l) => l.assignedToId === salesPerson.id);
  const totalLeads = assigned.length;
  const converted = assigned.filter((l) => CONVERTED.includes(l.status)).length;

  const statusBreakdown = Object.values(LeadStatus)
    .map((status) => ({
      status,
      count: assigned.filter((l) => l.status === status).length,
    }))
    .filter((s) => s.count > 0);

  return {
    salesPersonId: salesPerson.id,
    name: salesPerson.name,
    email: salesPerson.email,
    totalLeads,
    newLeads: assigned.filter((l) => l.status === LeadStatus.New).length,
    inProgress: assigned.filter((l) => IN_PROGRESS.includes(l.status)).length,
    interested: assigned.filter((l) => INTERESTED.includes(l.status)).length,
    converted,
    notInterested: assigned.filter((l) => LOST.includes(l.status)).length,
    conversionRate: totalLeads ? Math.round((converted / totalLeads) * 1000) / 10 : 0,
    statusBreakdown,
  };
}

export function computeTeamPerformance(
  salesPeople: { id: string; name: string; email: string }[],
  leads: { status: LeadStatus; assignedToId?: string | null }[]
): SalesPersonPerformanceData[] {
  return salesPeople.map((sp) => computeSalesPersonPerformance(sp, leads));
}
