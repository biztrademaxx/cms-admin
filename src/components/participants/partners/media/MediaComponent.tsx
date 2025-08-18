"use client";
import * as Yup from "yup";
import React from "react";
import Button from "../../../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateMediaPartnerDocument,
  DeleteMediaPartnerDocument,
  GetMediaPartnersByProjectDocument,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import PageBreadcrumb from "../../../common/PageBreadCrumb";
import EntityTable from "@/components/tables/entityTable";
import MediaPartnersModal from "@/components/modals/mediaPartnersModal";
import { base64ToFile, isBase64, uploadImageToCloud } from "@/utils/imageUtils";
import { Plus } from "lucide-react";
import ExportButton from "@/components/common/exportButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  description: Yup.string().required("Description is required"),
  logoUrl: Yup.string().required("Logo URL is required"),
  website: Yup.string().required("Website is required"),
});
const MediaPartnersComponent = () => {
  const { projectId, projectName } = useSelector((state: any) => state.project);
  const [createMediaPartner] = useMutation(CreateMediaPartnerDocument, {
    onCompleted: (data) => {
      console.log("Exhibitor created:", data);
      modal.closeModal();
    },
    refetchQueries: [
      {
        query: GetMediaPartnersByProjectDocument,
        variables: { projectId },
      },
    ],
  });

  const modal = useModal();

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      logoUrl: "",
      website: "",
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
        description: values.description,
        logoUrl: logoFileOrUrl,
        website: values.website,
      };

      if (values.id) {
        input.id = values.id;
      }

      await createMediaPartner({
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
          <PageBreadcrumb
            pageTitle="Media Partners"
            projectName={projectName}
          />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={modal.openModal}
              startIcon={<Plus className="w-4 h-4" />}
            >
              Add Media Partner
            </Button>
            <ExportButton
              query={GetMediaPartnersByProjectDocument}
              projectId={projectId}
              dataKey="getMediaPartnersByProject"
              fileName={`media_partners_${projectName || projectId}`}
              label="Export CSV"
            />
          </div>
        </div>
        <div className="space-y-6">
          <EntityTable
            title="Media Partners"
            query={GetMediaPartnersByProjectDocument}
            deleteMutation={DeleteMediaPartnerDocument}
            formik={formik}
            modal={modal}
            ModalComponent={MediaPartnersModal}
            dataKey="getMediaPartnersByProject"
            columns={[
              {
                key: "name",
                label: "Details",
                type: "avatar",
                subTextKey: "website",
              },
              { key: "description", label: "Description", type: "text" },
              { key: "status", label: "Status", type: "badge" },
              { key: "createdAt", label: "Created At", type: "date" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default MediaPartnersComponent;
