"use client";
import * as Yup from "yup";
import React from "react";
import { useModal } from "@/hooks/useModal";

import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateExhibitorDocument,
  GetExhibitorsByProjectDocument,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import { base64ToFile, isBase64, uploadImageToCloud } from "@/utils/imageUtils";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SearchField from "@/components/form/input/SearchField";
import Button from "@/components/ui/button/Button";
import ExhibitorsTable from "@/components/tables/exhibitorsTable";
import LeadsTable from "./leadsTable";

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
const LeadsComponent = () => {
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
          <PageBreadcrumb pageTitle="Leads" projectName={projectName} />
        </div>
        <div className="space-y-6">
          <LeadsTable formik={formik} modal={modal} />
        </div>
      </div>
    </div>
  );
};

export default LeadsComponent;
