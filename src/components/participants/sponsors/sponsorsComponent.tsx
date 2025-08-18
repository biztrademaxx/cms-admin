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
  SponsorStatus,
  SponsorType,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import EntityTable from "@/components/tables/entityTable";
import SponsorsModal from "@/components/modals/sponsorsModal";
import { base64ToFile, isBase64, uploadImageToCloud } from "@/utils/imageUtils";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Speaker name is required"),
  type: Yup.string().required("Type is required"),
  logoUrl: Yup.string().required("Logo URL is required"),
  address: Yup.string().required("Address is required"),
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
      // imageUrl: "",
      type: SponsorType.Supporting,
      logoUrl: "",
      status: SponsorStatus.Active,
      address: "",
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
        priority: 0,
        status: values.status,
        boothNumber: values.boothNumber,
        type: values.type,
        logoUrl: logoFileOrUrl,
        address: values.address,
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
          <Button size="sm" onClick={modal.openModal}>
            + Add Sponsors
          </Button>
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
              { key: "type", label: "Type", type: "text" },
              { key: "address", label: "Address", type: "text" },
              { key: "status", label: "Status", type: "badge" },
              { key: "createdAt", label: "Created At", type: "date" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SponsorsComponent;
