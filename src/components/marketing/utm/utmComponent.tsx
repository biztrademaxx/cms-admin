"use client";
import * as Yup from "yup";
import React from "react";
import Button from "../../ui/button/Button";
import ExhibitorsTable from "../../tables/exhibitorsTable";
import { useModal } from "@/hooks/useModal";
import ExhibitorsModal from "../../modals/exhibitorsModal";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateExhibitorDocument,
  GetExhibitorsByProjectDocument,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import { base64ToFile, isBase64, uploadImageToCloud } from "@/utils/imageUtils";
import SearchField from "../../form/input/SearchField";
import UTMDashboard from "./utmDashboard";

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
const UtmComponent = () => {
  const { projectId, projectName } = useSelector((state: any) => state.project);
//   const [createExhibitor] = useMutation(CreateExhibitorDocument, {
//     onCompleted: (data) => {
//       console.log("Exhibitor created:", data);
//       modal.closeModal();
//     },
//     refetchQueries: [
//       {
//         query: GetExhibitorsByProjectDocument,
//         variables: { projectId },
//       },
//     ],
//   });

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

    //   await createExhibitor({
    //     variables: {
    //       input,
    //     },
    //   });

      console.log(values);
    },
  });

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-wrap justify-between items-center p-2">
          <PageBreadcrumb pageTitle="UTM Builder" projectName={projectName} />
          <div className="flex items-center gap-2">
            {/* <Button size="sm" onClick={modal.openModal}>
              + Add UTM
            </Button> */}
          </div>
        </div>
        <div className="space-y-6">
          <UTMDashboard modal={modal} />
        </div>
      </div>
    </div>
  );
};

export default UtmComponent;
