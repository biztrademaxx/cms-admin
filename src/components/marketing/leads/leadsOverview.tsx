"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import ExportButton from "@/components/common/exportButton";
import BulkUploadModal from "./bulkUploadModal";
import StatusUpdateModal from "./statusUpdateModal";
import {
  GetFilteredLeadsDocument,
  GetSalesPeopleByProjectDocument,
  GetLeadsByProjectIdDocument,
  LeadSource,
  LeadStatus,
} from "@/gql_generated/graphql";
import {
  LEAD_STATUS_CONFIG,
  LEAD_SOURCE_CONFIG,
  getStatusLabel,
  getStatusColor,
  getSourceLabel,
} from "./leadStatusConfig";
import { indianStates, getCitiesForState } from "./stateCityPicker";
import { convertISOtoNormal } from "@/utils/dateUtils";
import {
  Plus,
  Upload,
  Phone,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";

const LeadsOverview = () => {
  const { projectId, projectName } = useSelector((state: any) => state.project);
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [statusModal, setStatusModal] = useState<{
    id: string;
    name: string;
    status: LeadStatus;
  } | null>(null);

  const filterInput = {
    projectId,
    page,
    limit: 15,
    ...(search && { search }),
    ...(stateFilter && { state: stateFilter }),
    ...(cityFilter && { city: cityFilter }),
    ...(statusFilter && { status: statusFilter as LeadStatus }),
    ...(sourceFilter && { source: sourceFilter as LeadSource }),
    ...(assignedFilter && { assignedToId: assignedFilter }),
  };

  const { data, loading } = useQuery(GetFilteredLeadsDocument, {
    variables: { input: filterInput },
    skip: !projectId,
  });

  const { data: salesData } = useQuery(GetSalesPeopleByProjectDocument, {
    variables: { projectId },
    skip: !projectId,
  });

  const filterCities = stateFilter ? getCitiesForState(stateFilter) : [];

  const leads = data?.getFilteredLeads?.leads ?? [];
  const total = data?.getFilteredLeads?.total ?? 0;
  const totalPages = data?.getFilteredLeads?.totalPages ?? 1;
  const salesPeople = salesData?.getSalesPeopleByProject ?? [];

  const clearFilters = () => {
    setSearch("");
    setStateFilter("");
    setCityFilter("");
    setStatusFilter("");
    setSourceFilter("");
    setAssignedFilter("");
    setPage(1);
  };

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center p-5 lg:p-6 border-b border-gray-200 dark:border-gray-800">
          <PageBreadcrumb pageTitle="Leads" projectName={projectName} />
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              startIcon={<Filter className="w-4 h-4" />}
            >
              Filters
            </Button>
            <Button
              size="sm"
              onClick={() => setBulkModalOpen(true)}
              startIcon={<Upload className="w-4 h-4" />}
            >
              Import Excel
            </Button>
            <ExportButton
              query={GetLeadsByProjectIdDocument}
              projectId={projectId}
              dataKey="getLeadsByProjectId"
              fileName={`leads_${projectName || projectId}`}
              label="Export CSV"
            />
          </div>
        </div>

        <div className="flex">
          {/* Filter Sidebar */}
          {showFilters && (
            <div className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                  Filter Leads
                </h4>
                <button
                  onClick={clearFilters}
                  className="text-xs text-brand-500 hover:underline"
                >
                  Clear all
                </button>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Name, email, company..."
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                  State
                </label>
                <select
                  value={stateFilter}
                  onChange={(e) => {
                    setStateFilter(e.target.value);
                    setCityFilter("");
                    setPage(1);
                  }}
                  className="w-full py-2 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  <option value="">All States</option>
                  {indianStates.map((s) => (
                    <option key={s.isoCode} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                  City
                </label>
                <select
                  value={cityFilter}
                  onChange={(e) => {
                    setCityFilter(e.target.value);
                    setPage(1);
                  }}
                  disabled={!stateFilter}
                  className="w-full py-2 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white disabled:opacity-50"
                >
                  <option value="">
                    {stateFilter ? "All Cities" : "Select state first"}
                  </option>
                  {filterCities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full py-2 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  <option value="">All Statuses</option>
                  {LEAD_STATUS_CONFIG.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                  Source
                </label>
                <select
                  value={sourceFilter}
                  onChange={(e) => {
                    setSourceFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full py-2 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  <option value="">All Sources</option>
                  {LEAD_SOURCE_CONFIG.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                  Lead Owner
                </label>
                <select
                  value={assignedFilter}
                  onChange={(e) => {
                    setAssignedFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full py-2 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  <option value="">All Sales People</option>
                  {salesPeople.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      {sp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Main Table */}
          <div className="flex-1 min-w-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Lead Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      City / State
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Source
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Lead Owner
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                        Loading leads...
                      </td>
                    </tr>
                  ) : leads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/30 cursor-pointer"
                      >
                        <td
                          className="px-4 py-3"
                          onClick={() =>
                            router.push(
                              `/projects/marketing/leads/${lead.id}`
                            )
                          }
                        >
                          <div className="font-medium text-sm text-gray-800 dark:text-white">
                            {lead.name}
                          </div>
                          <div className="text-xs text-gray-500">{lead.email}</div>
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300"
                          onClick={() =>
                            router.push(
                              `/projects/marketing/leads/${lead.id}`
                            )
                          }
                        >
                          {lead.companyName || "—"}
                        </td>
                        <td className="px-4 py-3">
                          {lead.phone ? (
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1 text-sm text-brand-500 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Phone className="w-3.5 h-3.5" />
                              {lead.phone}
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300"
                          onClick={() =>
                            router.push(
                              `/projects/marketing/leads/${lead.id}`
                            )
                          }
                        >
                          {[lead.city, lead.state].filter(Boolean).join(", ") || "—"}
                        </td>
                        <td
                          className="px-4 py-3"
                          onClick={() =>
                            router.push(
                              `/projects/marketing/leads/${lead.id}`
                            )
                          }
                        >
                          <Badge size="sm" color="info">
                            {getSourceLabel(lead.source)}
                          </Badge>
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300"
                          onClick={() =>
                            router.push(
                              `/projects/marketing/leads/${lead.id}`
                            )
                          }
                        >
                          {lead.assignedTo?.name || "Unassigned"}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setStatusModal({
                                id: lead.id,
                                name: lead.name,
                                status: lead.status,
                              });
                            }}
                          >
                            <Badge size="sm" color={getStatusColor(lead.status)}>
                              {getStatusLabel(lead.status)}
                            </Badge>
                          </button>
                        </td>
                        <td
                          className="px-4 py-3 text-xs text-gray-500"
                          onClick={() =>
                            router.push(
                              `/projects/marketing/leads/${lead.id}`
                            )
                          }
                        >
                          {convertISOtoNormal(lead.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-500">
                Total Records: {total}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {page} of {totalPages}
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
      </div>

      <BulkUploadModal
        isOpen={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        projectId={projectId}
      />

      {statusModal && (
        <StatusUpdateModal
          isOpen={!!statusModal}
          onClose={() => setStatusModal(null)}
          leadId={statusModal.id}
          leadName={statusModal.name}
          currentStatus={statusModal.status}
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default LeadsOverview;
