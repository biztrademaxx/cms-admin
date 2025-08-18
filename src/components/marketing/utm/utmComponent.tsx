"use client";
import * as Yup from "yup";
import React from "react";
import Button from "../../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateUtmDocument,
  GetUtmByProjectIdDocument,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import UTMDashboard from "./utmDashboard";
import { Plus } from "lucide-react";

const validationSchema = Yup.object().shape({
  url: Yup.string().required("URL is required"),
  source: Yup.string().required("Source is required"),
  medium: Yup.string().required("Medium is required"),
  campaign: Yup.string().required("Campaign is required"),
  term: Yup.string(),
  content: Yup.string(),
});

const UtmComponent = () => {
  const modal = useModal();
  const { projectId, projectName } = useSelector((state: any) => state.project);
  const [SaveUTM] = useMutation(CreateUtmDocument, {
    onCompleted: (data) => {
      console.log("UTM saved successfully:", data);
      modal.closeModal();
    },
    refetchQueries: [
      {
        query: GetUtmByProjectIdDocument,
        variables: {
          id: projectId,
          groupBy: "email",
        },
      },
    ], // Adjust this based on your query name
    onError: (error:any) => {
      console.error("Error saving UTM:", error);
      alert("Sorry!..." + error?.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      url: "",
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: "",
    },
    validationSchema,
    onSubmit: async () => {
      try {
        if (!projectId) {
          alert("Project id is required to save UTM.");
          return;
        }
        await SaveUTM({
          variables: {
            input: {
              ...formik.values,
              projectId: projectId,
            },
          },
        });
      } catch (error:any) {
        console.error("Error saving UTM:", error);
        alert("Sorry!..." + error?.message);
      }
    },
  });

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-wrap justify-between items-center p-2">
          <PageBreadcrumb pageTitle="UTM Builder" projectName={projectName} />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={modal.openModal}
              startIcon={<Plus className="w-4 h-4" />}
            >
              Add UTM
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <UTMDashboard modal={modal} formik={formik} />
        </div>
      </div>
    </div>
  );
};

export default UtmComponent;
