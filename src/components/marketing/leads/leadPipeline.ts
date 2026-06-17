import { LeadStatus } from "@/gql_generated/graphql";

export const LEAD_PIPELINE_PHASES = [
  {
    id: "new",
    label: "New",
    color: "bg-blue-500",
    statuses: [LeadStatus.New],
  },
  {
    id: "contact",
    label: "Contacted",
    color: "bg-indigo-500",
    statuses: [LeadStatus.Contacted, LeadStatus.NoResponse, LeadStatus.Busy],
  },
  {
    id: "followup",
    label: "Follow Up",
    color: "bg-amber-500",
    statuses: [LeadStatus.Callback, LeadStatus.FollowUp, LeadStatus.SendDetails],
  },
  {
    id: "interested",
    label: "Interested",
    color: "bg-purple-500",
    statuses: [LeadStatus.Interested, LeadStatus.Hot],
  },
  {
    id: "converted",
    label: "Converted",
    color: "bg-green-500",
    statuses: [LeadStatus.Converted, LeadStatus.Sold],
  },
  {
    id: "lost",
    label: "Lost",
    color: "bg-red-500",
    statuses: [LeadStatus.NotInterested, LeadStatus.Cold],
  },
];

export function getPhaseForStatus(status: LeadStatus) {
  return (
    LEAD_PIPELINE_PHASES.find((p) => p.statuses.includes(status)) ??
    LEAD_PIPELINE_PHASES[0]
  );
}

export function countByPhase(leads: { status: LeadStatus }[]) {
  return LEAD_PIPELINE_PHASES.map((phase) => ({
    ...phase,
    count: leads.filter((l) => phase.statuses.includes(l.status)).length,
  }));
}
