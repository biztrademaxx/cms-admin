"use client";

import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import SalesLayoutShell from "./salesLayoutShell";
import { useSalesSession } from "./useSalesSession";
import { GetFilteredLeadsDocument } from "@/gql_generated/graphql";
import { getStatusLabel, getStatusColor } from "@/components/marketing/leads/leadStatusConfig";
import { computeSalesPersonPerformance } from "@/components/marketing/leads/salesPerformanceUtils";
import Badge from "@/components/ui/badge/Badge";
import { Trophy, Target, TrendingUp, Users, XCircle } from "lucide-react";

const SalesProfile = () => {
  const { session, loadingSession, projectMemberships, openProjectPicker, handleLogout } =
    useSalesSession();

  const { data: leadsData, loading } = useQuery(GetFilteredLeadsDocument, {
    variables: {
      input: {
        projectId: session?.projectId ?? "",
        assignedToId: session?.salesPersonId ?? "",
        page: 1,
        limit: 500,
      },
    },
    skip: !session?.projectId || !session?.salesPersonId,
    fetchPolicy: "cache-and-network",
  });

  const assignedLeads = leadsData?.getFilteredLeads?.leads ?? [];

  const perf = useMemo(() => {
    if (!session) return null;
    return computeSalesPersonPerformance(
      { id: session.salesPersonId, name: session.name, email: "" },
      assignedLeads
    );
  }, [session, assignedLeads]);

  if (loadingSession || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const statCards = perf
    ? [
        { label: "Total Leads", value: perf.totalLeads, icon: Users, color: "text-blue-600" },
        { label: "In Progress", value: perf.inProgress, icon: Target, color: "text-amber-600" },
        { label: "Interested", value: perf.interested, icon: TrendingUp, color: "text-purple-600" },
        { label: "Converted", value: perf.converted, icon: Trophy, color: "text-green-600" },
        { label: "Not Interested", value: perf.notInterested, icon: XCircle, color: "text-red-500" },
        {
          label: "Conversion Rate",
          value: `${perf.conversionRate}%`,
          icon: TrendingUp,
          color: "text-brand-600",
        },
      ]
    : [];

  return (
    <SalesLayoutShell
      userName={session.name}
      projectName={session.projectName}
      projectId={session.projectId}
      projectMemberships={projectMemberships}
      onOpenProjectPicker={openProjectPicker}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 p-6 text-white">
          <h2 className="text-xl font-bold">{perf?.name ?? session.name}</h2>
          <p className="text-brand-100 text-sm mt-1">
            {session.projectName || "Current project"}
          </p>
          <p className="text-3xl font-bold mt-4">
            {loading ? "..." : `${perf?.conversionRate ?? 0}%`} conversion rate
          </p>
          <p className="text-brand-100 text-sm">
            {perf?.converted ?? 0} converted out of {perf?.totalLeads ?? 0} assigned leads in this
            project
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${card.color}`} />
                  <p className="text-xs text-gray-500">{card.label}</p>
                </div>
                <p className={`text-2xl font-bold ${card.color}`}>
                  {loading ? "—" : card.value}
                </p>
              </div>
            );
          })}
        </div>

        {perf?.statusBreakdown && perf.statusBreakdown.length > 0 && (
          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5">
            <h3 className="text-base font-semibold mb-4">Status Breakdown</h3>
            <div className="space-y-3">
              {perf.statusBreakdown.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <Badge size="sm" color={getStatusColor(item.status)}>
                    {getStatusLabel(item.status)}
                  </Badge>
                  <div className="flex items-center gap-3 flex-1 mx-4">
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full"
                        style={{
                          width: `${perf.totalLeads ? (item.count / perf.totalLeads) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SalesLayoutShell>
  );
};

export default SalesProfile;
