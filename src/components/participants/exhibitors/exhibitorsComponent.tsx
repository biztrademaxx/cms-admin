"use client";
import * as Yup from "yup";
import React from "react";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateExhibitorDocument,
  DeleteExhibitorDocument,
  GetExhibitorsByProjectDocument,
  Status,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import { base64ToFile, isBase64, uploadImageToCloud } from "@/utils/imageUtils";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import EntityTable from "@/components/tables/entityTable";
import ExhibitorsModal from "@/components/modals/exhibitorsModal";
import ExportButton from "@/components/common/exportButton";
import { Plus } from "lucide-react";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  description: Yup.string().required("Description is required"),
  linkedinUrl: Yup.string().required("Linkedin is required"),
  logoUrl: Yup.string().required("Logo URL is required"),
  website: Yup.string().required("Website is required"),
});
const ExhibitorsComponent = () => {
  const { projectId, projectName } = useSelector((state: any) => state.project);
  const [createExhibitor] = useMutation(CreateExhibitorDocument, {
    onCompleted: (data) => {
      modal.closeModal();
    },
    refetchQueries: [
      {
        query: GetExhibitorsByProjectDocument,
        variables: { projectId },
      },
    ],
  });

  const modal = useModal();

  const formik = useFormik({
    initialValues: {
      id: "",
      companyName: "",
      description: "",
      linkedinUrl: "",
      logoUrl: "",
      website: "",
      address: "",
      contactEmail: "",
      contactName: "",
      contactTitle: "",
      boothNumber: "",
      status: Status.Active,
      badge:"",
      seqNo:0


    },
    validationSchema,
    onSubmit: async (values) => {
      let logoFileOrUrl = formik.values.logoUrl;
      if (typeof logoFileOrUrl === "string" && isBase64(logoFileOrUrl)) {
        const file = base64ToFile(logoFileOrUrl, "uploaded-image.png");
        logoFileOrUrl = await uploadImageToCloud(file);
      }
      const input: any = {
        projectId,
        companyName: values.companyName,
        description: values.description,
        linkedinUrl: values.linkedinUrl,
        logoUrl: logoFileOrUrl,
        website: values.website,
        address: values.address,
        contactEmail: values.contactEmail,
        contactName: values.contactName,
        contactTitle: values.contactTitle,
        boothNumber: values.boothNumber,
        status: values.status,
        badge: values.badge,

      };

      if (values.id) {
        input.id = values.id;
      }

      await createExhibitor({
        variables: {
          input,
        },
      });

      console.log(values);
    },
  });

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-wrap justify-between items-center p-2">
          <PageBreadcrumb pageTitle="Exhibitors" projectName={projectName} />
          <div className="flex items-center gap-2">
            {/* <SearchField inputRef={null} /> */}
            <Button
              size="sm"
              onClick={modal.openModal}
              startIcon={<Plus className="w-4 h-4" />}
            >
              Add Exhibitor
            </Button>
            <ExportButton
              query={GetExhibitorsByProjectDocument}
              projectId={projectId}
              dataKey="getExhibitorsByProject"
              fileName={`exhibitors_${projectName || projectId}`}
              label="Export CSV"
            />
          </div>
        </div>
        <div className="space-y-6">
          <EntityTable
            title="Exhibitors"
            query={GetExhibitorsByProjectDocument}
            deleteMutation={DeleteExhibitorDocument}
            formik={formik}
            modal={modal}
            ModalComponent={ExhibitorsModal}
            dataKey="getExhibitorsByProject"
            columns={[
              { key: "companyName", label: "Details", type: "avatar",subTextKey: "website", },
              { key: "description", label: "Description", type: "text" },
              { key: "linkedinUrl", label: "LinkedIn", type: "link" },
              { key: "status", label: "Status", type: "badge" },
              { key: "createdAt", label: "Created At", type: "date" },
              { key: "boothNumber", label: "Booth Number", type: "text" },
              { key: "badge", label: "Badge", type: "text" },
              { key: "seqNo", label: "Seq No", type: "text" },




            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ExhibitorsComponent;
