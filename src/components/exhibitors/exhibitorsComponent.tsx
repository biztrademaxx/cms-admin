"use client";
import * as Yup from "yup";
import React from "react";
import Button from "../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import ExhibitorsModal from "../modals/exhibitorsModal";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateExhibitorDocument,
  DeleteExhibitorDocument,
  GetExhibitorsByProjectDocument,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { base64ToFile, isBase64, uploadImageToCloud } from "@/utils/imageUtils";
import SearchField from "../form/input/SearchField";
import EntityTable from "../tables/entityTable";

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
const ExhibitorsComponent = () => {
  const { projectId, projectName } = useSelector((state: any) => state.project);
  const [createExhibitor] = useMutation(CreateExhibitorDocument, {
    onCompleted: (data) => {
      console.log("Exhibitor created:", data);
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
      linkedin: "",
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
        companyName: values.companyName,
        description: values.description,
        linkedin: values.linkedin,
        logoUrl: logoFileOrUrl,
        website: values.website,
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
            <SearchField inputRef={null} />
            <Button size="sm" onClick={modal.openModal}>
              + Add Exhibitor
            </Button>
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
              {
                key: "companyName",
                label: "Details",
                type: "avatar",
                subTextKey: "website",
              },
              { key: "description", label: "Description", type: "text" },
              { key: "linkedin", label: "LinkedIn", type: "link" },
              { key: "status", label: "Status", type: "badge" },
              { key: "createdAt", label: "Created At", type: "date" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ExhibitorsComponent;
