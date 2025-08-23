"use client";
import * as Yup from "yup";
import React from "react";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateSponsorDocument,
  CreateSponsorInput,
  DeleteExhibitorDocument,
  GetSponsorByProjectDocument,
  SponsorType,
  Status,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import EntityTable from "@/components/tables/entityTable";
import SponsorsModal from "@/components/modals/sponsorsModal";
import { base64ToFile, isBase64, uploadImageToCloud } from "@/utils/imageUtils";
import { Plus } from "lucide-react";
import ExportButton from "@/components/common/exportButton";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Speaker name is required"),
  type: Yup.string().required("Type is required"),
  logoUrl: Yup.string().required("Logo URL is required"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
  website: Yup.string().required("Website is required"),
});
const SponsorsComponent = () => {
  const { projectId, projectName } = useSelector((state: any) => state.project);
  const [createSponsor] = useMutation(CreateSponsorDocument, {
    onCompleted: (data) => {
      console.log("Sponsor created:", data);
      modal.closeModal();
    },
    refetchQueries: [
      {
        query: GetSponsorByProjectDocument,
        variables: { projectId },
      },
    ],
  });

  const modal = useModal();

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      boothNumber: "",
      type: SponsorType.Silver,
      logoUrl: "",   
      linkedinUrl: "",
      website: "",
      contactEmail: "",
      contactTitle: "",
      contactName: "",
      description:"",
      status: Status.Active,
      address: "",
      hideFromParticipant: false
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
        name: values.name,
        status: values.status,
        boothNumber: values.boothNumber,
        type: values.type,
        logoUrl: logoFileOrUrl,
        address: values.address,
        description: values.description,
        linkedinUrl: values.linkedinUrl,
        website: values.website,
        contactEmail: values.contactEmail,
        contactName: values.contactName,
        contactTitle: values.contactTitle,
        hideFromParticipant: values.hideFromParticipant,

      };

      if (values.id) {
        input.id = values.id;
      }

      await createSponsor({
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
          <PageBreadcrumb pageTitle="Sponsors" projectName={projectName} />
         <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={modal.openModal}
              startIcon={<Plus className="w-4 h-4" />}
            >
              Add Sponsor
            </Button>
            <ExportButton
              query={GetSponsorByProjectDocument}
              projectId={projectId}
              dataKey="getSponsorsByProject"
              fileName={`sponsors_${projectName || projectId}`}
              label="Export CSV"
            />
          </div>
        </div>
        <div className="space-y-6">
          <EntityTable
            title="Sponsors"
            query={GetSponsorByProjectDocument}
            deleteMutation={DeleteExhibitorDocument}
            formik={formik}
            modal={modal}
            ModalComponent={SponsorsModal}
            dataKey="getSponsorsByProject"
            columns={[
              {
                key: "name",
                label: "Details",
                type: "avatar",
                subTextKey: "website",
              },
              { key: "boothNumber", label: "Booth", type: "text" },
              { key:"linkedinUrl",label:"Linkedin",type:"link"},
              { key: "type", label: "Type", type: "text" },
              { key: "address", label: "Address", type: "text" },
              { key: "status", label: "Status", type: "badge" },
              { key: "createdAt", label: "Created At", type: "date" },
          
           
  
              { key: "description", label: "Description", type: "text" },
              { key: "website", label: "Website", type: "link" },
              // { key: "contactName", label: "Contact Name", type: "text" },
              // { key: "contactTitle", label: "Contact Title", type: "text" },
              { key: "contactEmail", label: "Contact Email", type: "text" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SponsorsComponent;
