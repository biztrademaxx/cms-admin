"use client";

import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Badge from "@/components/ui/badge/Badge";
import {
  GetSalesPeopleByProjectDocument,
  GetLeadsByProjectIdDocument,
  LeadStatus,
} from "@/gql_generated/graphql";
import { getStatusLabel, getStatusColor } from "@/components/marketing/leads/leadStatusConfig";
import { computeTeamPerformance } from "@/components/marketing/leads/salesPerformanceUtils";
import { useActiveProject } from "@/hooks/useActiveProject";
import { Trophy, TrendingUp, Users } from "lucide-react";

const CONVERTED: LeadStatus[] = [LeadStatus.Converted, LeadStatus.Sold];

const SalesTeamPerformance = () => {
  const { projectId, projectName } = useActiveProject();

  const { data: spData, loading: spLoading, error: spError } = useQuery(
    GetSalesPeopleByProjectDocument,
    {
      variables: { projectId: projectId ?? "" },
      skip: !projectId,
      fetchPolicy: "cache-and-network",
    }
  );

  const { data: leadsData, loading: leadsLoading, error: leadsError } = useQuery(
    GetLeadsByProjectIdDocument,
    {
      variables: { projectId: projectId ?? "" },
      skip: !projectId,
      fetchPolicy: "cache-and-network",
    }
  );

  const allLeads = leadsData?.getLeadsByProjectId ?? [];

  const team = useMemo(
    () => computeTeamPerformance(spData?.getSalesPeopleByProject ?? [], allLeads),
    [spData, allLeads]
  );

  const loading = spLoading || leadsLoading;
  const error = spError || leadsError;
  const totalLeads = allLeads.length;
  const totalConverted = allLeads.filter((l) => CONVERTED.includes(l.status)).length;
  const totalAssigned = team.reduce((sum, sp) => sum + sp.totalLeads, 0);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5 lg:p-6">
      <PageBreadcrumb pageTitle="Sales Performance" projectName={projectName ?? ""} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="rounded-xl border p-4 flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">Sales Team</p>
            <p className="text-2xl font-bold">{team.length}</p>
          </div>
        </div>
        <div className="rounded-xl border p-4 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-amber-500" />
          <div>
            <p className="text-xs text-gray-500">Total Leads</p>
            <p className="text-2xl font-bold">{totalLeads}</p>
            <p className="text-xs text-gray-400">{totalAssigned} assigned</p>
          </div>
        </div>
        <div className="rounded-xl border p-4 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-xs text-gray-500">Total Converted</p>
            <p className="text-2xl font-bold">{totalConverted}</p>
          </div>
        </div>
      </div>

      {!projectId ? (
        <p className="text-center text-gray-500 py-12">
          Please select a project from the dashboard first.
        </p>
      ) : loading && team.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Loading performance data...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-12">
          Failed to load data. Make sure the backend is running on port 3000.
        </p>
      ) : team.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          No sales people found. Go to Sales Team and add members first.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales Person</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">New</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">In Progress</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interested</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Converted</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lost</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Top Status</th>
              </tr>
            </thead>
            <tbody>
              {[...team]
                .sort((a, b) => b.converted - a.converted)
                .map((sp) => {
                  const topStatus = [...sp.statusBreakdown].sort((a, b) => b.count - a.count)[0];
                  return (
                    <tr key={sp.salesPersonId} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm">{sp.name}</div>
                        <div className="text-xs text-gray-500">{sp.email}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">{sp.totalLeads}</td>
                      <td className="px-4 py-3 text-sm text-blue-600">{sp.newLeads}</td>
                      <td className="px-4 py-3 text-sm text-amber-600">{sp.inProgress}</td>
                      <td className="px-4 py-3 text-sm text-purple-600">{sp.interested}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-green-600">{sp.converted}</td>
                      <td className="px-4 py-3 text-sm text-red-500">{sp.notInterested}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-bold text-brand-600">{sp.conversionRate}%</span>
                      </td>
                      <td className="px-4 py-3">
                        {topStatus ? (
                          <Badge size="sm" color={getStatusColor(topStatus.status)}>
                            {getStatusLabel(topStatus.status)} ({topStatus.count})
                          </Badge>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
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
};

export default SalesTeamPerformance;
