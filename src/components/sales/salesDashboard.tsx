"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import SalesLayoutShell from "./salesLayoutShell";
import LeadPipelineOverview from "@/components/marketing/leads/leadPipelineOverview";
import StatusUpdateModal from "@/components/marketing/leads/statusUpdateModal";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  GetFilteredLeadsDocument,
  GetLeadsByProjectIdDocument,
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
} from "lucide-react";

interface Session {
  name: string;
  salesPersonId: string;
  projectId: string;
}

const SalesDashboard = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusModal, setStatusModal] = useState<{
    id: string;
    name: string;
    status: LeadStatus;
    leadType: LeadType;
  } | null>(null);

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
          salesPersonId: data.salesPersonId,
          projectId: data.projectId,
        });
      });
  }, [router]);

  const { data: allLeadsData } = useQuery(GetLeadsByProjectIdDocument, {
    variables: { projectId: session?.projectId ?? "" },
    skip: !session?.projectId,
  });

  const perf = useMemo(() => {
    if (!session?.salesPersonId) return null;
    return computeSalesPersonPerformance(
      { id: session.salesPersonId, name: session.name, email: "" },
      allLeadsData?.getLeadsByProjectId ?? []
    );
  }, [session, allLeadsData]);

  const { data, loading } = useQuery(GetFilteredLeadsDocument, {
    variables: {
      input: {
        projectId: session?.projectId ?? "",
        assignedToId: session?.salesPersonId,
        page,
        limit: 50,
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter as LeadStatus }),
      },
    },
    skip: !session?.projectId,
  });

  const allLeadsQuery = useQuery(GetFilteredLeadsDocument, {
    variables: {
      input: {
        projectId: session?.projectId ?? "",
        assignedToId: session?.salesPersonId,
        page: 1,
        limit: 500,
      },
    },
    skip: !session?.projectId,
  });

  const leads = data?.getFilteredLeads?.leads ?? [];
  const allLeads = allLeadsQuery.data?.getFilteredLeads?.leads ?? [];
  const total = data?.getFilteredLeads?.total ?? 0;
  const totalPages = data?.getFilteredLeads?.totalPages ?? 1;

  const handleLogout = async () => {
    await fetch("/api/signout", { method: "POST" });
    router.push("/signin");
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <SalesLayoutShell userName={session.name} onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Quick performance strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white dark:bg-gray-900 border p-4">
            <p className="text-xs text-gray-500">Total Leads</p>
            <p className="text-2xl font-bold">{perf?.totalLeads ?? 0}</p>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 border p-4">
            <p className="text-xs text-gray-500">In Progress</p>
            <p className="text-2xl font-bold text-amber-600">{perf?.inProgress ?? 0}</p>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 border p-4">
            <p className="text-xs text-gray-500">Converted</p>
            <p className="text-2xl font-bold text-green-600">{perf?.converted ?? 0}</p>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 border p-4">
            <p className="text-xs text-gray-500">Conversion Rate</p>
            <p className="text-2xl font-bold text-brand-600">{perf?.conversionRate ?? 0}%</p>
          </div>
        </div>

        <LeadPipelineOverview leads={allLeads} />

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search leads..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="py-2.5 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="">All Statuses</option>
            {LEAD_STATUS_CONFIG.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Leads table */}
        <div className="rounded-xl bg-white dark:bg-gray-900 border overflow-hidden">
          <div className="px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-800 dark:text-white">My Leads</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500">Loading...</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500">No leads assigned yet</td></tr>
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
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-sm text-brand-500">
                            <Phone className="w-3.5 h-3.5" />{lead.phone}
                          </a>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-3 text-sm">{[lead.city, lead.state].filter(Boolean).join(", ") || "—"}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setStatusModal({ id: lead.id, name: lead.name, status: lead.status, leadType: lead.leadType })}>
                          <Badge size="sm" color={getStatusColor(lead.status)}>{getStatusLabel(lead.status)}</Badge>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{convertISOtoNormal(lead.createdAt)}</td>
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
              <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">{page} / {totalPages}</span>
              <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
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
