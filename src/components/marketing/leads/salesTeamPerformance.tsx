"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { ArrowUpRight, Phone, RefreshCw, Trophy, TrendingUp, Users } from "lucide-react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Badge from "@/components/ui/badge/Badge";
import { GetSalesTeamPerformanceDocument } from "@/gql_generated/graphql";
import { getStatusLabel, getStatusColor } from "./leadStatusConfig";
import { useActiveProject } from "@/hooks/useActiveProject";

export default function SalesTeamPerformance() {
  const { projectId, projectName } = useActiveProject();
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(GetSalesTeamPerformanceDocument, {
    variables: { projectId: projectId ?? "" }, skip: !projectId,
    fetchPolicy: "cache-and-network", pollInterval: 60000, notifyOnNetworkStatusChange: true,
  });
  const team = data?.getSalesTeamPerformance ?? [];
  const sum = (key: "totalLeads" | "converted" | "callsToday" | "callsThisWeek" | "callsThisMonth") =>
    team.reduce((total, person) => total + person[key], 0);
  const cards = [
    { label: "Sales team", value: team.length, icon: Users, color: "text-blue-500" },
    { label: "Assigned leads", value: sum("totalLeads"), icon: TrendingUp, color: "text-amber-500" },
    { label: "Converted leads", value: sum("converted"), icon: Trophy, color: "text-green-500" },
    { label: "Calls today", value: sum("callsToday"), icon: Phone, color: "text-brand-500" },
    { label: "Calls this week", value: sum("callsThisWeek"), icon: Phone, color: "text-purple-500" },
    { label: "Calls this month", value: sum("callsThisMonth"), icon: Phone, color: "text-cyan-500" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-200 lg:p-6">
      <PageBreadcrumb pageTitle="Sales Performance" projectName={projectName ?? ""} />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Each lead status change made by a salesperson counts as one call.
          Totals use India time (IST), calendar months, and weeks starting Monday.
          Select a salesperson to view graphs and call history.
        </p>
        <button type="button" onClick={() => void refetch()} disabled={loading || !projectId}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-50 dark:border-gray-700">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {projectId && !error && (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <Icon className={`h-8 w-8 ${color}`} />
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-2xl font-bold">{loading && !data ? "—" : value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!projectId ? (
        <p className="py-12 text-center text-gray-500">Please select a project from the dashboard first.</p>
      ) : error ? (
        <div role="alert" className="py-12 text-center">
          <p className="text-red-500">Unable to load sales performance. Please try again.</p>
          <button type="button" onClick={() => void refetch()} className="mt-3 text-sm text-brand-600 hover:underline">Retry</button>
        </div>
      ) : loading && !data ? (
        <p className="py-12 text-center text-gray-500">Loading performance data...</p>
      ) : team.length === 0 ? (
        <p className="py-12 text-center text-gray-500">No salespeople found. Go to Sales Team and add members first.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800" aria-busy={loading}>
          <table className="w-full">
            <caption className="sr-only">Salesperson call activity and current lead performance</caption>
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                {["Salesperson", "Calls today", "This week", "This month", "Assigned", "New", "In progress", "Interested", "Converted", "Lost", "Rate", "Top status"].map((label) => (
                  <th key={label} className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...team].sort((a, b) => b.callsToday - a.callsToday || b.callsThisMonth - a.callsThisMonth || b.converted - a.converted).map((person) => {
                const topStatus = [...person.statusBreakdown].sort((a, b) => b.count - a.count)[0];
                const href = `/projects/marketing/sales-performance/${encodeURIComponent(person.salesPersonId)}`;
                return (
                  <tr key={person.salesPersonId} onClick={() => router.push(href)}
                    className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3">
                      <Link href={href} onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline dark:text-brand-400">
                        {person.name}<ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      <div className="text-xs text-gray-500">{person.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-brand-600 dark:text-brand-400">{person.callsToday}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{person.callsThisWeek}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{person.callsThisMonth}</td>
                    <td className="px-4 py-3 text-sm">{person.totalLeads}</td>
                    <td className="px-4 py-3 text-sm text-blue-600">{person.newLeads}</td>
                    <td className="px-4 py-3 text-sm text-amber-600">{person.inProgress}</td>
                    <td className="px-4 py-3 text-sm text-purple-600">{person.interested}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">{person.converted}</td>
                    <td className="px-4 py-3 text-sm text-red-500">{person.notInterested}</td>
                    <td className="px-4 py-3 text-sm font-bold text-brand-600">{person.conversionRate}%</td>
                    <td className="px-4 py-3">
                      {topStatus ? <Badge size="sm" color={getStatusColor(topStatus.status)}>{getStatusLabel(topStatus.status)} ({topStatus.count})</Badge> : <span className="text-xs text-gray-400">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
