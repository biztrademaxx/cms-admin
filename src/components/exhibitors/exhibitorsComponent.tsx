"use client";
import * as Yup from "yup";
import React, { useEffect } from "react";
import Button from "../ui/button/Button";
import ExhibitorsTable from "../tables/exhibitorsTable";
import { useModal } from "@/hooks/useModal";
import ExhibitorsModal from "../modals/exhibitorsModal";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateExhibitorDocument,
  GetExhibitorsByProjectDocument,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  description: Yup.string().required("Description is required"),
  linkedin: Yup.string()
    .required("Linkedin is required")
    .url("Enter a valid URL"),
  logoUrl: Yup.string()
    .required("Logo URL is required")
    .url("Enter a valid URL"),
  website: Yup.string()
    .required("Website is required")
    .url("Enter a valid URL"),
});
const ExhibitorsComponent = () => {
  const projectId = useSelector((state: any) => state.project.projectId);
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
      await createExhibitor({
        variables: {
          input: {
            projectId,
            id: values.id,
            companyName: values.companyName,
            description: values.description,
            linkedin: values.linkedin,
            logoUrl: values.logoUrl,
            website: values.website,
          },
        },
      });

      console.log(values);
    },
  });
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex justify-between items-center">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Exhibitors
          </h3>
          <Button size="sm" onClick={modal.openModal}>
            + Add Exhibitor
          </Button>
        </div>
        <div className="space-y-6">
          <ExhibitorsTable formik={formik} modal={modal} />
        </div>
      </div>
    </div>
  );
};

export default ExhibitorsComponent;
