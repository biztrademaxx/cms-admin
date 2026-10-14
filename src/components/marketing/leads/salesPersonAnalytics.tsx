"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { ArrowLeft, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import {
  GetSalesPersonByIdDocument,
  GetSalesPersonCallAnalyticsDocument,
} from "@/gql_generated/graphql";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Badge from "@/components/ui/badge/Badge";
import { getStatusColor, getStatusLabel } from "./leadStatusConfig";
import SalesCallChart from "./salesCallChart";
import {
  SALES_CALL_PERIODS, callRangeError, formatCallDate, indiaToday, salesCallRange,
  type CallGrouping, type SalesCallPeriod,
} from "@/lib/salesCallPeriods";

const panel = "rounded-xl border border-gray-200 p-5 dark:border-gray-800";
const button = "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-gray-700";
const inputClass = "h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-700 dark:bg-gray-900";

function Metric({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className={panel}>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export default function SalesPersonAnalytics() {
  const { salesPersonId } = useParams<{ salesPersonId: string }>();
  const [period, setPeriod] = useState<SalesCallPeriod>("30d");
  const [range, setRange] = useState(() => salesCallRange("30d"));
  const [grouping, setGrouping] = useState<CallGrouping>("daily");
  const [page, setPage] = useState(1);
  // Resolve project from the person so bookmarked links work after a reload.
  const personQuery = useQuery(GetSalesPersonByIdDocument, {
    variables: { id: salesPersonId }, skip: !salesPersonId,
    fetchPolicy: "cache-and-network",
  });
  const person = personQuery.data?.getSalesPersonById;
  const rangeError = callRangeError(range.fromDate, range.toDate);
  const analyticsQuery = useQuery(GetSalesPersonCallAnalyticsDocument, {
    variables: {
      input: {
        salesPersonId, projectId: person?.projectId ?? "", ...range,
        activityPage: page, activityLimit: 20,
      },
    },
    skip: !person?.projectId || !!rangeError,
    fetchPolicy: "cache-and-network", pollInterval: 60000,
    notifyOnNetworkStatusChange: true,
  });
  const analytics = analyticsQuery.data?.getSalesPersonCallAnalytics;
  const loading = personQuery.loading || analyticsQuery.loading;
  const error = personQuery.error || analyticsQuery.error;
  const performance = analytics?.performance;

  const selectPeriod = (value: SalesCallPeriod) => {
    setPeriod(value);
    if (value !== "custom") setRange(salesCallRange(value));
    setPage(1);
  };
  const updateDate = (key: "fromDate" | "toDate", value: string) => {
    setRange((current) => ({ ...current, [key]: value }));
    setPeriod("custom");
    setPage(1);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-200 lg:p-6">
      <Link href="/projects/marketing/sales-performance" className="mb-4 inline-flex items-center gap-2 text-sm text-brand-600 hover:underline dark:text-brand-400">
        <ArrowLeft className="h-4 w-4" /> Back to sales performance
      </Link>
      <PageBreadcrumb pageTitle={person ? `${person.name} — Sales Analytics` : "Salesperson Analytics"}
        projectName={person?.project?.name ?? ""} />
      {person && <p className="-mt-3 mb-5 text-sm text-gray-500">{person.email}</p>}
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        One call = one lead status change made by this salesperson. All dates use India time (IST).
        Weeks start on Monday.
      </p>

      {performance && (
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Metric label="Calls today" value={performance.callsToday} />
          <Metric label="Calls this week" value={performance.callsThisWeek} hint="Current calendar week" />
          <Metric label="Calls this month" value={performance.callsThisMonth} hint="Current calendar month" />
        </div>
      )}

      <div className={`${panel} mb-6`}>
        <div className="mb-4 flex flex-wrap gap-2">
          {SALES_CALL_PERIODS.map((item) => (
            <button key={item.id} type="button" onClick={() => selectPeriod(item.id)}
              aria-pressed={period === item.id}
              className={`${button} ${period === item.id ? "border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400" : ""}`}>
              {item.label}
            </button>
          ))}
          <button type="button" onClick={() => selectPeriod("custom")} aria-pressed={period === "custom"}
            className={`${button} ${period === "custom" ? "border-brand-500 text-brand-600" : ""}`}>Custom</button>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-1 text-sm">
            From date
            <input type="date" aria-label="From date" value={range.fromDate} max={range.toDate || indiaToday()}
              onChange={(event) => updateDate("fromDate", event.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            To date
            <input type="date" aria-label="To date" value={range.toDate} min={range.fromDate} max={indiaToday()}
              onChange={(event) => updateDate("toDate", event.target.value)} className={inputClass} />
          </label>
          <button type="button" className={button} disabled={loading || !person || !!rangeError}
            onClick={() => void analyticsQuery.refetch()}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <p className="pb-2 text-xs text-gray-500">Date ranges include both dates, up to 366 days.</p>
        </div>
        {rangeError && <p role="alert" className="mt-3 text-sm text-red-500">{rangeError}</p>}
      </div>

      {error ? (
        <div role="alert" className="py-10 text-center">
          <p className="text-red-500">{personQuery.error ? "Unable to find this salesperson." : "Unable to load analytics. Please try again."}</p>
          <button type="button" className={`${button} mt-4`} onClick={() => {
            if (personQuery.error) void personQuery.refetch();
            else void analyticsQuery.refetch();
          }}>Retry</button>
        </div>
      ) : rangeError ? null : !analytics || !performance ? (
        <p className="py-12 text-center text-gray-500">Loading salesperson analytics...</p>
      ) : (
        <div aria-busy={loading}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">Activity: {formatCallDate(analytics.fromDate)} – {formatCallDate(analytics.toDate)}</h3>
            {loading && <span role="status" className="text-xs text-gray-500">Updating...</span>}
          </div>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="Calls in selected period" value={analytics.totalCalls} />
            <Metric label="Unique leads called" value={analytics.uniqueLeads} />
            <Metric label="Daily average" value={analytics.averageCallsPerDay} hint="Includes days with zero calls" />
            <Metric label="Days with calls" value={analytics.activeDays} hint={`Of ${analytics.daily.length} days`} />
          </div>

          <section className={`${panel} mb-6`}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold">Calls over time</h3>
              <label className="flex items-center gap-2 text-sm">
                Group by
                <select value={grouping} onChange={(event) => setGrouping(event.target.value as CallGrouping)} className={inputClass}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>
            </div>
            {analytics.totalCalls === 0 && (
              <p className="mb-3 text-sm text-gray-500">No recorded calls in this period.</p>
            )}
            <SalesCallChart buckets={analytics[grouping]} grouping={grouping} />
            <p className="text-xs text-gray-500">Weekly and monthly totals include only dates inside the selected range.</p>
          </section>

          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <section className={panel}>
              <h3 className="mb-4 font-semibold">Daily call totals</h3>
              <div className="max-h-80 overflow-auto">
                <table className="w-full text-sm">
                  <caption className="sr-only">Calls and unique leads for every day in the selected period</caption>
                  <thead className="sticky top-0 bg-white text-left text-xs text-gray-500 dark:bg-gray-900">
                    <tr><th className="py-3">Date (IST)</th><th className="py-3 text-right">Calls</th><th className="py-3 text-right">Unique leads</th></tr>
                  </thead>
                  <tbody>
                    {[...analytics.daily].reverse().map((day) => (
                      <tr key={day.startDate} className="border-t border-gray-100 dark:border-gray-800">
                        <td className="py-3">{formatCallDate(day.startDate)}</td>
                        <td className="py-3 text-right font-semibold">{day.calls}</td>
                        <td className="py-3 text-right">{day.uniqueLeads}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className={panel}>
              <h3 className="mb-4 font-semibold">Call outcomes</h3>
              <p className="mb-4 text-xs text-gray-500">Statuses set during calls in the selected period.</p>
              {analytics.callOutcomes.length === 0 ? <p className="text-sm text-gray-500">No recorded calls.</p> : (
                <div className="space-y-4">
                  {analytics.callOutcomes.map((outcome) => (
                    <div key={outcome.status}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <Badge size="sm" color={getStatusColor(outcome.status)}>{getStatusLabel(outcome.status)}</Badge>
                        <span>{outcome.count}</span>
                      </div>
                      <div className="h-2 rounded bg-gray-100 dark:bg-gray-800">
                        <div className="h-2 rounded bg-brand-500" style={{ width: `${(outcome.count / analytics.totalCalls) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <section className={`${panel} mb-6`}>
            <h3 className="mb-4 font-semibold">Current lead pipeline</h3>
            <p className="mb-4 text-xs text-gray-500">All leads currently assigned to this salesperson.</p>
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-6">
              {[
                ["Assigned", performance.totalLeads], ["New", performance.newLeads],
                ["In progress", performance.inProgress], ["Interested", performance.interested],
                ["Converted", performance.converted], ["Conversion rate", `${performance.conversionRate}%`],
              ].map(([label, value]) => (
                <div key={label}><p className="text-xs text-gray-500">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></div>
              ))}
            </div>
          </section>

          <section className={panel}>
            <h3 className="mb-4 font-semibold">Call history</h3>
            {analytics.recentCalls.length === 0 ? (
              <p className="text-sm text-gray-500">No recorded calls in this period.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <caption className="sr-only">Status changes counted as calls, latest first</caption>
                  <thead className="border-b text-left text-xs text-gray-500 dark:border-gray-800">
                    <tr><th className="px-3 py-3">Date and time (IST)</th><th className="px-3 py-3">Lead</th><th className="px-3 py-3">Status change</th><th className="px-3 py-3">Notes</th></tr>
                  </thead>
                  <tbody>
                    {analytics.recentCalls.map((call) => (
                      <tr key={call.id} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="whitespace-nowrap px-3 py-3">{new Date(call.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}</td>
                        <td className="px-3 py-3">
                          <Link className="font-medium text-brand-600 hover:underline dark:text-brand-400"
                            href={`/projects/marketing/leads/${encodeURIComponent(call.leadId)}`}>{call.leadName}</Link>
                          {call.companyName && <p className="text-xs text-gray-500">{call.companyName}</p>}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <span className="text-gray-500">{getStatusLabel(call.previousStatus)} → </span>
                          <Badge size="sm" color={getStatusColor(call.status)}>{getStatusLabel(call.status)}</Badge>
                        </td>
                        <td className="min-w-48 max-w-sm whitespace-pre-wrap break-words px-3 py-3">{call.notes || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs text-gray-500">Page {analytics.activityPage} of {analytics.activityTotalPages} · {analytics.totalCalls} calls</p>
              <div className="flex gap-2">
                <button type="button" className={button} disabled={loading || page <= 1} onClick={() => setPage((current) => current - 1)}>
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <button type="button" className={button} disabled={loading || page >= analytics.activityTotalPages} onClick={() => setPage((current) => current + 1)}>
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
