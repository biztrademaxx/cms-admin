export type AnalyticsPeriodId =
  | "7d"
  | "30d"
  | "90d"
  | "180d"
  | "270d"
  | "365d";

export const SALES_ANALYTICS_PERIODS: {
  id: AnalyticsPeriodId;
  label: string;
  days: number;
}[] = [
  { id: "7d", label: "Weekly (last 7 days)", days: 7 },
  { id: "30d", label: "Monthly (last 30 days)", days: 30 },
  { id: "90d", label: "Last 3 months", days: 90 },
  { id: "180d", label: "Last 6 months", days: 180 },
  { id: "270d", label: "Last 9 months", days: 270 },
  { id: "365d", label: "Last 12 months", days: 365 },
];

export function getPeriodStartDate(periodId: AnalyticsPeriodId): Date {
  const period = SALES_ANALYTICS_PERIODS.find((p) => p.id === periodId);
  const days = period?.days ?? 30;
  const from = new Date();
  from.setHours(0, 0, 0, 0);
  from.setDate(from.getDate() - days);
  return from;
}

export function isValidPeriodId(value: string): value is AnalyticsPeriodId {
  return SALES_ANALYTICS_PERIODS.some((p) => p.id === value);
}
