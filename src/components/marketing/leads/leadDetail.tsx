"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import StatusUpdateModal from "./statusUpdateModal";
import LeadTimeline from "./leadTimeline";
import { GetLeadByIdDocument, LeadStatus } from "@/gql_generated/graphql";
import {
  getStatusLabel,
  getStatusColor,
  getSourceLabel,
} from "./leadStatusConfig";
import { getPhaseForStatus } from "./leadPipeline";
import { convertISOtoNormal } from "@/utils/dateUtils";
import { Phone, Mail, ArrowLeft, Edit } from "lucide-react";

const LeadDetail = () => {
  const params = useParams();
  const router = useRouter();
  const leadId = params.leadId as string;
  const { projectName, projectId } = useSelector((state: any) => state.project);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const { data, loading } = useQuery(GetLeadByIdDocument, {
    variables: { id: leadId },
    skip: !leadId,
  });

  const lead = data?.getLeadById;

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

  const infoFields = [
    { label: "Lead Owner", value: lead.assignedTo?.name || "Unassigned" },
    { label: "Email", value: lead.email },
    { label: "Phone", value: lead.phone },
    { label: "Mobile", value: lead.phone },
    { label: "Lead Status", value: getStatusLabel(lead.status) },
    { label: "Lead Source", value: getSourceLabel(lead.source) },
    { label: "Company", value: lead.companyName },
    { label: "Job Title", value: lead.jobTitle },
    { label: "City", value: lead.city },
    { label: "State", value: lead.state },
    { label: "Country", value: lead.country },
    { label: "Industry", value: lead.industry },
    { label: "Lead Type", value: lead.leadType },
    { label: "UTM Source", value: lead.utm?.source },
    { label: "UTM Campaign", value: lead.utm?.campaign },
    { label: "UTM Medium", value: lead.utm?.medium },
    { label: "Created", value: convertISOtoNormal(lead.createdAt) },
    { label: "Last Updated", value: lead.updatedAt ? convertISOtoNormal(lead.updatedAt) : "—" },
  ];

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center p-5 lg:p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/projects/marketing/leads")}
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
            <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
              Lead Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {infoFields.map(
                (field) =>
                  field.value && (
                    <div key={field.label} className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {field.label}
                      </span>
                      <span className="text-sm text-gray-800 dark:text-white mt-0.5">
                        {field.value}
                      </span>
                    </div>
                  )
              )}
            </div>

            {lead.message && (
              <div className="mt-6">
                <span className="text-xs text-gray-500 dark:text-gray-400">Message</span>
                <p className="text-sm text-gray-800 dark:text-white mt-1">
                  {lead.message}
                </p>
              </div>
            )}

            {lead.notes && (
              <div className="mt-6 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800">
                <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                  Notes
                </span>
                <p className="text-sm text-gray-800 dark:text-white mt-1">
                  {lead.notes}
                </p>
              </div>
            )}
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800 pt-6 lg:pt-0 lg:pl-6">
            <LeadTimeline leadId={lead.id} currentStatus={lead.status} />
          </div>
        </div>
      </div>

      <StatusUpdateModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        leadId={lead.id}
        leadName={lead.name}
        currentStatus={lead.status}
        projectId={projectId}
      />
    </div>
  );
};

export default LeadDetail;
