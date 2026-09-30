import { LeadSource, LeadStatus, LeadType } from "@/gql_generated/graphql";

export const LEAD_TYPE_OPTIONS = [
  { label: "Visitor", value: LeadType.Visitor },
  { label: "Exhibitor", value: LeadType.Exhibitor },
  { label: "Sponsor", value: LeadType.Sponsor },
  { label: "Speaker", value: LeadType.Speaker },
  { label: "Partner", value: LeadType.Partner },
  { label: "Delegate", value: LeadType.Delegate },
  { label: "Brochure", value: LeadType.Brochure },
  { label: "Participant", value: LeadType.Participant },
  { label: "Enquiry", value: LeadType.Enquiry },
  { label: "Awards", value: LeadType.Awards },
  { label: "Other", value: LeadType.Other },
];

export const getLeadTypeLabel = (leadType: LeadType) =>
  LEAD_TYPE_OPTIONS.find((t) => t.value === leadType)?.label ?? leadType;

export const LEAD_STATUS_CONFIG = [
  { label: "New", value: LeadStatus.New, color: "info" as const },
  { label: "No Response", value: LeadStatus.NoResponse, color: "warning" as const },
  { label: "Callback", value: LeadStatus.Callback, color: "warning" as const },
  { label: "Busy", value: LeadStatus.Busy, color: "warning" as const },
  { label: "Follow Up", value: LeadStatus.FollowUp, color: "warning" as const },
  { label: "Send Details", value: LeadStatus.SendDetails, color: "info" as const },
  { label: "Interested", value: LeadStatus.Interested, color: "success" as const },
  { label: "Not Interested", value: LeadStatus.NotInterested, color: "error" as const },
  { label: "Converted", value: LeadStatus.Converted, color: "success" as const },
  { label: "Contacted", value: LeadStatus.Contacted, color: "info" as const },
  { label: "Hot", value: LeadStatus.Hot, color: "error" as const },
  { label: "Cold", value: LeadStatus.Cold, color: "info" as const },
  { label: "Sold", value: LeadStatus.Sold, color: "success" as const },
];

export const LEAD_SOURCE_CONFIG = [
  { label: "Website (UTM)", value: LeadSource.WebsiteUtm },
  { label: "Excel Bulk", value: LeadSource.ExcelBulk },
  { label: "Manual", value: LeadSource.Manual },
];

export const getStatusLabel = (status: LeadStatus) =>
  LEAD_STATUS_CONFIG.find((s) => s.value === status)?.label ?? status;

export const getStatusColor = (status: LeadStatus) =>
  LEAD_STATUS_CONFIG.find((s) => s.value === status)?.color ?? "info";

export const getSourceLabel = (source: LeadSource) =>
  LEAD_SOURCE_CONFIG.find((s) => s.value === source)?.label ?? source;
