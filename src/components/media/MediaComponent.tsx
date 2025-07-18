"use client";
import * as Yup from "yup";
import React from "react";
import Button from "../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateMediaPartnerDocument,
  GetMediaPartnersByProjectDocument,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import PageBreadcrumb from "../common/PageBreadCrumb";
import MediaPartnersTable from "../tables/mediaPartnersTable";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  description: Yup.string().required("Description is required"),
  logoUrl: Yup.string()
    .required("Logo URL is required")
    .url("Enter a valid URL"),
  website: Yup.string()
    .required("Website is required")
    .url("Enter a valid URL"),
});
const MediaPartnersComponent = () => {
  const projectId = useSelector((state: any) => state.project.projectId);
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
      const input: any = {
        projectId,
        name: values.name,
        description: values.description,
        logoUrl: values.logoUrl,
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
        <div className="flex justify-between items-center p-2">
          <PageBreadcrumb pageTitle="Media Partners" />
          <Button size="sm" onClick={modal.openModal}>
            + Add Media Partner
          </Button>
        </div>
        <div className="space-y-6">
          <MediaPartnersTable formik={formik} modal={modal} />
        </div>
      </div>
    </div>
  );
};

export default MediaPartnersComponent;
