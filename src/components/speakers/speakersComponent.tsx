"use client";
import * as Yup from "yup";
import React from "react";
import Button from "../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateSpeakerDocument,
  CreateSpeakerInput,
  GetSpeakersByProjectDocument,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import PageBreadcrumb from "../common/PageBreadCrumb";
import SpeakersTable from "../tables/speakersTable";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Speaker name is required"),
  companyName: Yup.string().required("Company name is required"),
  linkedinUrl: Yup.string()
    .required("Linkedin URL is required")
    .url("Enter a valid URL"),
  image: Yup.string()
    .required("Profile picture URL is required")
    .url("Enter a valid URL"),
  companyLogo: Yup.string()
    .required("Logo URL is required")
    .url("Enter a valid URL"),
  designation: Yup.string().required("Designation is required"),
});
const SpeakersComponent = () => {
  const projectId = useSelector((state: any) => state.project.projectId);
  const [createMediaPartner] = useMutation(CreateSpeakerDocument, {
    onCompleted: (data) => {
      console.log("Exhibitor created:", data);
      modal.closeModal();
    },
    refetchQueries: [
      {
        query: GetSpeakersByProjectDocument,
        variables: { projectId },
      },
    ],
  });

  const modal = useModal();

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      linkedinUrl: "",
      image: "",
      designation: "",
      companyLogo: "",
      companyName: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const input: CreateSpeakerInput = {
        projectId,
        name: values.name,
        linkedinUrl: values.linkedinUrl,
        image: values.image,
        designation: values.designation,
        companyLogo: values.companyLogo,
        companyName: values.companyName,
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
          <PageBreadcrumb pageTitle="Speakers" />
          <Button size="sm" onClick={modal.openModal}>
            + Add Speakers
          </Button>
        </div>
        <div className="space-y-6">
          <SpeakersTable formik={formik} modal={modal} />
        </div>
      </div>
    </div>
  );
};

export default SpeakersComponent;
