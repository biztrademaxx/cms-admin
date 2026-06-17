"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import SalesLayoutShell from "./salesLayoutShell";
import { GetLeadsByProjectIdDocument } from "@/gql_generated/graphql";
import { getStatusLabel, getStatusColor } from "@/components/marketing/leads/leadStatusConfig";
import { computeSalesPersonPerformance } from "@/components/marketing/leads/salesPerformanceUtils";
import Badge from "@/components/ui/badge/Badge";
import { Trophy, Target, TrendingUp, Users, XCircle } from "lucide-react";

interface Session {
  name: string;
  email?: string;
  salesPersonId: string;
  projectId: string;
}

const SalesProfile = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    fetch("/api/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.role !== "SALES" || !data.salesPersonId) {
          router.push("/signin");
          return;
        }
        setSession({
          name: data.name,
          email: data.email,
          salesPersonId: data.salesPersonId,
          projectId: data.projectId,
        });
      });
  }, [router]);

  const { data: leadsData, loading } = useQuery(GetLeadsByProjectIdDocument, {
    variables: { projectId: session?.projectId ?? "" },
    skip: !session?.projectId,
  });

  const perf = useMemo(() => {
    if (!session) return null;
    return computeSalesPersonPerformance(
      { id: session.salesPersonId, name: session.name, email: session.email ?? "" },
      leadsData?.getLeadsByProjectId ?? []
    );
  }, [session, leadsData]);

  const handleLogout = async () => {
    await fetch("/api/signout", { method: "POST" });
    router.push("/signin");
  };

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  const statCards = perf
    ? [
        { label: "Total Leads", value: perf.totalLeads, icon: Users, color: "text-blue-600" },
        { label: "In Progress", value: perf.inProgress, icon: Target, color: "text-amber-600" },
        { label: "Interested", value: perf.interested, icon: TrendingUp, color: "text-purple-600" },
        { label: "Converted", value: perf.converted, icon: Trophy, color: "text-green-600" },
        { label: "Not Interested", value: perf.notInterested, icon: XCircle, color: "text-red-500" },
        { label: "Conversion Rate", value: `${perf.conversionRate}%`, icon: TrendingUp, color: "text-brand-600" },
      ]
    : [];

  return (
    <SalesLayoutShell userName={session.name} onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 p-6 text-white">
          <h2 className="text-xl font-bold">{perf?.name ?? session.name}</h2>
          <p className="text-brand-100 text-sm mt-1">{perf?.email}</p>
          <p className="text-3xl font-bold mt-4">
            {loading ? "..." : `${perf?.conversionRate ?? 0}%`} conversion rate
          </p>
          <p className="text-brand-100 text-sm">
            {perf?.converted ?? 0} converted out of {perf?.totalLeads ?? 0} assigned leads
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
                <p className={`text-2xl font-bold ${card.color}`}>{loading ? "—" : card.value}</p>
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
