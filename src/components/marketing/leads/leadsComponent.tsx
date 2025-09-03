"use client";
import * as Yup from "yup";
import React from "react";
import {
  DeleteExhibitorDocument,
  GetLeadsByProjectIdDocument,
  LeadStatus,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import EntityTable from "@/components/tables/entityTable";
import DelegatesModal from "@/components/modals/delegatesModal";
import ExportButton from "@/components/common/exportButton";
import Button from "@/components/ui/button/Button";
import { Plus } from "lucide-react";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  description: Yup.string().required("Description is required"),
  linkedin: Yup.string()
    .required("Linkedin is required")
    .url("Enter a valid URL"),
  logoUrl: Yup.string().required("Logo URL is required"),
  website: Yup.string()
    .required("Website is required")
    .url("Enter a valid URL"),
});

const leadsStatusConfig = [
  { label: "New", value: LeadStatus.New },
  { label: "Contacted", value: LeadStatus.Contacted },
  { label: "Hot", value: LeadStatus.Hot },
  { label: "Cold", value: LeadStatus.Cold },
  { label: "Sold", value: LeadStatus.Sold },
];

const LeadsComponent = () => {
  const { projectId, projectName } = useSelector((state: any) => state.project);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-wrap justify-between items-center p-2">
          <PageBreadcrumb pageTitle="Leads" projectName={projectName} />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => {}}
              disabled
              startIcon={<Plus className="w-4 h-4" />}
            >
              {" "}
              Add Bulk Leads
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
        <div className="space-y-6">
          <EntityTable
            title="Leads"
            query={GetLeadsByProjectIdDocument}
            deleteMutation={DeleteExhibitorDocument}
            formik={{}}
            modal={DelegatesModal}
            ModalComponent={() => null}
            dataKey="getLeadsByProjectId"
            actionSection={false}
            statusConfig={leadsStatusConfig}
            columns={[
              { key: "id", label: "Order ID", type: "id", subTextKey: "leads" },
              {
                key: "name",
                label: "Details",
                type: "avatar",
                subTextKey: "jobTitle",
              },
              { key: "leadType", label: "Lead Type", type: "badge" },
              { key: "email", label: "Email", type: "email" },
              { key: "companyName", label: "Company", type: "text" },
              { key: "phone", label: "Phone", type: "text" },
              { key: "status", label: "Status", type: "badge" },

              { key: "message", label: "Message", type: "text" },
              { key: "quantity", label: "Quantity", type: "text" },

              { key: "industry", label: "Industry", type: "text" },
              { key: "createdAt", label: "Created At", type: "date" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsComponent;
