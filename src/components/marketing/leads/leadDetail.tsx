"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import StatusUpdateModal from "./statusUpdateModal";
import AssignLeadModal from "./assignLeadModal";
import ContactPersonSection from "./contactPersonSection";
import LeadInfoTable from "./leadInfoTable";
import LeadTimeline from "./leadTimeline";
import { GetFilteredLeadsDocument, GetLeadByIdDocument, LeadSource, LeadStatus, LeadType } from "@/gql_generated/graphql";
import {
  ADMIN_LEAD_PAGE_SIZE,
  adminLeadDetailPath,
  adminLeadListPath,
  readAdminLeadListQuery,
} from "./leadListQuery";
import {
  getStatusLabel,
  getStatusColor,
} from "./leadStatusConfig";
import { getPhaseForStatus } from "./leadPipeline";
import { Phone, Mail, ArrowLeft, Edit, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";

const LeadDetail = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadId = params.leadId as string;
  const listQuery = readAdminLeadListQuery(searchParams);
  const { projectName, projectId } = useSelector((state: any) => state.project);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const { data, loading } = useQuery(GetLeadByIdDocument, {
    variables: { id: leadId },
    skip: !leadId,
  });

  const { data: pageData } = useQuery(GetFilteredLeadsDocument, {
    variables: {
      input: {
        projectId,
        page: listQuery.page,
        limit: ADMIN_LEAD_PAGE_SIZE,
        ...(listQuery.search && { search: listQuery.search }),
        ...(listQuery.state && { state: listQuery.state }),
        ...(listQuery.city && { city: listQuery.city }),
        ...(listQuery.status && { status: listQuery.status as LeadStatus }),
        ...(listQuery.source && { source: listQuery.source as LeadSource }),
        ...(listQuery.leadType && { leadType: listQuery.leadType as LeadType }),
        ...(listQuery.assignedToId && { assignedToId: listQuery.assignedToId }),
        ...(listQuery.letter && { letter: listQuery.letter }),
      },
    },
    skip: !projectId,
  });

  const lead = data?.getLeadById;
  const pageLeads = pageData?.getFilteredLeads?.leads ?? [];
  const leadIndex = pageLeads.findIndex((item) => item.id === leadId);
  const previousLead = leadIndex > 0 ? pageLeads[leadIndex - 1] : null;
  const nextLead = leadIndex >= 0 && leadIndex < pageLeads.length - 1 ? pageLeads[leadIndex + 1] : null;

  const openListLead = (id: string) => {
    router.push(adminLeadDetailPath(id, listQuery));
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading lead details...</div>
    );
  }

  if (!lead) {
    return (
      <div className="p-6 text-center text-gray-500">Lead not found</div>
    );
  }

  const phase = getPhaseForStatus(lead.status);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center p-5 lg:p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(adminLeadListPath(listQuery))}
              aria-label="Back to leads"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <PageBreadcrumb pageTitle="Lead Details" projectName={projectName} />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
                {lead.name}
                {lead.companyName && (
                  <span className="text-gray-500 font-normal">
                    {" "}
                    — {lead.companyName}
                  </span>
                )}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {lead.phone && (
              <a href={`tel:${lead.phone}`}>
                <Button size="sm" variant="outline" startIcon={<Phone className="w-4 h-4" />}>
                  Call
                </Button>
              </a>
            )}
            {lead.email && (
              <a href={`mailto:${lead.email}`}>
                <Button size="sm" variant="outline" startIcon={<Mail className="w-4 h-4" />}>
                  Email
                </Button>
              </a>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAssignModalOpen(true)}
              startIcon={<UserPlus className="w-4 h-4" />}
            >
              Assign Lead
            </Button>
            <Button
              size="sm"
              onClick={() => setStatusModalOpen(true)}
              startIcon={<Edit className="w-4 h-4" />}
            >
              Update Status
            </Button>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="p-5 lg:p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Lead Owner</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {lead.assignedTo?.name || "Unassigned"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Email</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {lead.email}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Phone</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {lead.phone || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <div className="flex items-center gap-2">
                <Badge size="sm" color={getStatusColor(lead.status)}>
                  {getStatusLabel(lead.status)}
                </Badge>
                <span className={`text-xs px-2 py-0.5 rounded-full text-white ${phase.color}`}>
                  {phase.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Information + Timeline */}
        <div className="p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <LeadInfoTable mode="admin" lead={lead} />

            <ContactPersonSection
              leadId={lead.id}
              contactPersonName={lead.contactPersonName}
              contactPersonPhone={lead.contactPersonPhone}
              contactPersonDesignation={lead.contactPersonDesignation}
              contactPersonEmail={lead.contactPersonEmail}
            />

            {leadIndex >= 0 && (
              <div className="mt-4 flex items-center justify-between gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!previousLead}
                  onClick={() => previousLead && openListLead(previousLead.id)}
                  startIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
                <span className="text-xs text-gray-500">
                  {leadIndex + 1} of {pageLeads.length} on this page
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!nextLead}
                  onClick={() => nextLead && openListLead(nextLead.id)}
                  endIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800 pt-6 lg:pt-0 lg:pl-6">
            <LeadTimeline leadId={lead.id} currentStatus={lead.status} />
          </div>
        </div>
      </div>

      <AssignLeadModal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        leadId={lead.id}
        leadName={lead.name}
        projectId={projectId}
        currentAssignedToId={lead.assignedToId}
      />

      <StatusUpdateModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        leadId={lead.id}
        leadName={lead.name}
        currentStatus={lead.status}
        currentLeadType={lead.leadType}
        projectId={projectId}
      />
    </div>
  );
};

export default LeadDetail;
