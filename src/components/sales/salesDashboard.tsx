"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import SalesLayoutShell from "./salesLayoutShell";
import { useSalesSession } from "./useSalesSession";
import LeadPipelineOverview from "@/components/marketing/leads/leadPipelineOverview";
import StatusUpdateModal from "@/components/marketing/leads/statusUpdateModal";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  GetFilteredLeadsDocument,
  LeadStatus,
  LeadType,
} from "@/gql_generated/graphql";
import {
  getStatusLabel,
  getStatusColor,
  LEAD_STATUS_CONFIG,
} from "@/components/marketing/leads/leadStatusConfig";
import { computeSalesPersonPerformance } from "@/components/marketing/leads/salesPerformanceUtils";
import { convertISOtoNormal } from "@/utils/dateUtils";
import {
  Phone,
  ChevronLeft,
  ChevronRight,
  Search,
  ExternalLink,
  Target,
  TrendingUp,
  Users,
  CheckCircle2,
} from "lucide-react";

const SalesDashboard = () => {
  const router = useRouter();
  const { session, loadingSession, projectMemberships, openProjectPicker, handleLogout } =
    useSalesSession();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusModal, setStatusModal] = useState<{
    id: string;
    name: string;
    status: LeadStatus;
    leadType: LeadType;
  } | null>(null);

  const leadsInput = useMemo(
    () =>
      session
        ? {
            projectId: session.projectId,
            assignedToId: session.salesPersonId,
            page,
            limit: 50,
            ...(search && { search }),
            ...(statusFilter && { status: statusFilter as LeadStatus }),
          }
        : null,
    [session, page, search, statusFilter]
  );

  const { data, loading } = useQuery(GetFilteredLeadsDocument, {
    variables: { input: leadsInput! },
    skip: !leadsInput,
    fetchPolicy: "cache-and-network",
  });

  const allLeadsQuery = useQuery(GetFilteredLeadsDocument, {
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

  const leads = data?.getFilteredLeads?.leads ?? [];
  const allLeads = allLeadsQuery.data?.getFilteredLeads?.leads ?? [];
  const total = data?.getFilteredLeads?.total ?? 0;
  const totalPages = data?.getFilteredLeads?.totalPages ?? 1;

  const perf = useMemo(() => {
    if (!session) return null;
    return computeSalesPersonPerformance(
      { id: session.salesPersonId, name: session.name, email: "" },
      allLeads
    );
  }, [session, allLeads]);

  if (loadingSession || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500 dark:bg-[#0C0C0C]">
        Loading dashboard…
      </div>
    );
  }

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
        <div className="rounded-2xl border border-brand-200/60 bg-gradient-to-br from-brand-50 to-white p-5 dark:border-brand-900/40 dark:from-brand-950/40 dark:to-gray-950">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Leads assigned to you in{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {session.projectName || "this project"}
            </span>
            . Other projects are hidden until you switch.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {[
            { label: "Total leads", value: perf?.totalLeads ?? 0, icon: Users, tone: "text-gray-900 dark:text-white" },
            { label: "In progress", value: perf?.inProgress ?? 0, icon: Target, tone: "text-amber-600" },
            { label: "Converted", value: perf?.converted ?? 0, icon: CheckCircle2, tone: "text-emerald-600" },
            { label: "Conversion", value: `${perf?.conversionRate ?? 0}%`, icon: TrendingUp, tone: "text-brand-600" },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{kpi.label}</p>
                  <Icon className="h-4 w-4 text-brand-500/80" />
                </div>
                <p className={`text-2xl font-bold tabular-nums ${kpi.tone}`}>{kpi.value}</p>
              </div>
            );
          })}
        </div>

        <LeadPipelineOverview leads={allLeads} />

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search leads..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:min-w-[180px]"
          >
            <option value="">All Statuses</option>
            {LEAD_STATUS_CONFIG.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">My leads</h3>
            <p className="mt-0.5 text-xs text-gray-500">Click a row to open details</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Lead
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    City
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                      No leads assigned to you in this project yet
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer"
                      onClick={() => router.push(`/sales/leads/${lead.id}`)}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm">{lead.name}</div>
                        <div className="text-xs text-gray-500">{lead.email}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">{lead.companyName || "—"}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        {lead.phone ? (
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1 text-sm text-brand-500"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {lead.phone}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {[lead.city, lead.state].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() =>
                            setStatusModal({
                              id: lead.id,
                              name: lead.name,
                              status: lead.status,
                              leadType: lead.leadType,
                            })
                          }
                        >
                          <Badge size="sm" color={getStatusColor(lead.status)}>
                            {getStatusLabel(lead.status)}
                          </Badge>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {convertISOtoNormal(lead.createdAt)}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => router.push(`/sales/leads/${lead.id}`)}
                          className="text-brand-500 hover:underline text-xs flex items-center gap-1"
                        >
                          View <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <span className="text-sm text-gray-500">Total: {total}</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">
                {page} / {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {statusModal && (
        <StatusUpdateModal
          isOpen={!!statusModal}
          onClose={() => setStatusModal(null)}
          leadId={statusModal.id}
          leadName={statusModal.name}
          currentStatus={statusModal.status}
          currentLeadType={statusModal.leadType}
          projectId={session.projectId}
          changedById={session.salesPersonId}
          changedByName={session.name}
        />
      )}
    </SalesLayoutShell>
  );
};

export default SalesDashboard;
