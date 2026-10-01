"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter, useParams } from "next/navigation";
import SalesLayoutShell from "./salesLayoutShell";
import { useSalesSession } from "./useSalesSession";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import StatusUpdateModal from "@/components/marketing/leads/statusUpdateModal";
import ContactPersonSection from "@/components/marketing/leads/contactPersonSection";
import LeadInfoTable from "@/components/marketing/leads/leadInfoTable";
import LeadTimeline from "@/components/marketing/leads/leadTimeline";
import { GetLeadByIdDocument } from "@/gql_generated/graphql";
import {
  getStatusLabel,
  getStatusColor,
} from "@/components/marketing/leads/leadStatusConfig";
import { getPhaseForStatus } from "@/components/marketing/leads/leadPipeline";
import { Phone, Mail, ArrowLeft, Edit } from "lucide-react";

const SalesLeadDetail = () => {
  const params = useParams();
  const router = useRouter();
  const leadId = params.leadId as string;
  const { session, loadingSession, projectMemberships, openProjectPicker, handleLogout } =
    useSalesSession();
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const { data, loading } = useQuery(GetLeadByIdDocument, {
    variables: { id: leadId },
    skip: !leadId,
  });

  const lead = data?.getLeadById;

  if (!session || loadingSession || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const canAccess =
    lead &&
    lead.projectId === session.projectId &&
    lead.assignedToId === session.salesPersonId;

  if (!lead || !canAccess) {
    return (
      <SalesLayoutShell
        userName={session.name}
        projectName={session.projectName}
        projectId={session.projectId}
        projectMemberships={projectMemberships}
        onOpenProjectPicker={openProjectPicker}
        onLogout={handleLogout}
      >
        <p className="text-center text-gray-500 py-12">
          Lead not found or not assigned to you in this project
        </p>
      </SalesLayoutShell>
    );
  }

  const phase = getPhaseForStatus(lead.status);

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
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => router.push("/sales")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mt-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {lead.name}
              </h2>
              <p className="text-sm text-gray-500">{lead.companyName || lead.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge size="sm" color={getStatusColor(lead.status)}>
                  {getStatusLabel(lead.status)}
                </Badge>
                <span className={`text-xs px-2 py-0.5 rounded-full text-white ${phase.color}`}>
                  {phase.label} Phase
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
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
            <Button size="sm" onClick={() => setStatusModalOpen(true)} startIcon={<Edit className="w-4 h-4" />}>
              Update Status
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5">
            <LeadInfoTable mode="sales" lead={lead} />

            <ContactPersonSection
              leadId={lead.id}
              contactPersonName={lead.contactPersonName}
              contactPersonPhone={lead.contactPersonPhone}
              contactPersonDesignation={lead.contactPersonDesignation}
              contactPersonEmail={lead.contactPersonEmail}
            />
          </div>

          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5">
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
        currentLeadType={lead.leadType}
        projectId={session.projectId}
        changedById={session.salesPersonId}
        changedByName={session.name}
      />
    </SalesLayoutShell>
  );
};

export default SalesLeadDetail;
