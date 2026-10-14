export type SalesCallPeriod = "today" | "7d" | "30d" | "90d" | "365d" | "custom";
export type CallGrouping = "daily" | "weekly" | "monthly";

export const SALES_CALL_PERIODS: { id: SalesCallPeriod; label: string; days: number }[] = [
  { id: "today", label: "Today", days: 1 },
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "90d", label: "Last 3 months", days: 90 },
  { id: "365d", label: "Last 12 months", days: 365 },
];

export function indiaToday(now = new Date()): string {
  return new Date(now.getTime() + 330 * 60 * 1000).toISOString().slice(0, 10);
}

export function salesCallRange(period: SalesCallPeriod, now = new Date()) {
  const toDate = indiaToday(now);
  const days = SALES_CALL_PERIODS.find((item) => item.id === period)?.days ?? 30;
  const start = new Date(`${toDate}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - days + 1);
  return { fromDate: start.toISOString().slice(0, 10), toDate };
}

export function callRangeError(fromDate: string, toDate: string): string | null {
  if (!fromDate || !toDate) return "Choose both dates.";
  if (fromDate > toDate) return "From date must be on or before to date.";
  if (toDate > indiaToday()) return "To date cannot be in the future.";
  const days = (Date.parse(toDate) - Date.parse(fromDate)) / 86400000 + 1;
  if (!Number.isFinite(days) || days > 366) return "Select a valid range of up to 366 days.";
  return null;
}

export function formatCallDate(dateKey: string, grouping: CallGrouping = "daily"): string {
  const date = new Date(`${dateKey}T00:00:00Z`);
  const label = date.toLocaleDateString("en-IN", {
    timeZone: "UTC", month: "short", year: "numeric",
    ...(grouping !== "monthly" && { day: "numeric" }),
  });
  return grouping === "weekly" ? `Week of ${label}` : label;
}
