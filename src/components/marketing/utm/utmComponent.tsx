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
  LeadScalarFieldEnum,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import UTMDashboard from "./utmDashboard";
import UtmModal from "./utmModal";
import { buildUTMInput, getUTMFormValues, isValidUTMUrl } from "./common";
import type { UTMEntry, UTMFormValues } from "./utm.types";
import { Plus } from "lucide-react";

const validationSchema = Yup.object().shape({
  url: Yup.string().trim().required("URL is required").test(
    "website-url",
    "Enter a valid http or https URL",
    (value) => !value || isValidUTMUrl(value),
  ),
  source: Yup.string().trim().required("Source is required"),
  medium: Yup.string().trim().required("Medium is required"),
  campaign: Yup.string().trim().required("Campaign is required"),
  term: Yup.string(),
  content: Yup.string(),
});

const UtmComponent = () => {
  const modal = useModal();
  const [editingItem, setEditingItem] = React.useState<UTMEntry | null>(null);
  const { projectId, projectName } = useSelector(
    (state: { project: { projectId: string; projectName: string } }) => state.project,
  );
  const [saveUTM] = useMutation(CreateUtmDocument, {
    refetchQueries: [{
      query: GetUtmByProjectIdDocument,
      variables: {
        id: projectId,
        input: { groupBy: [LeadScalarFieldEnum.UtmSource], projectId },
      },
    }],
    awaitRefetchQueries: true,
  });

  const formik = useFormik<UTMFormValues>({
    initialValues: getUTMFormValues(),
    validationSchema,
    onSubmit: async (values, helpers) => {
      if (!projectId) {
        helpers.setStatus("Select a project before saving a UTM.");
        return;
      }
      helpers.setStatus(undefined);
      try {
        await saveUTM({
          variables: { input: buildUTMInput(values, projectId, editingItem?.id) },
        });
        helpers.resetForm({ values: getUTMFormValues() });
        setEditingItem(null);
        modal.closeModal();
      } catch (error) {
        helpers.setStatus(error instanceof Error ? error.message : "Unable to save UTM.");
      }
    },
  });

  const handleAdd = () => {
    setEditingItem(null);
    formik.resetForm({ values: getUTMFormValues() });
    modal.openModal();
  };

  const handleEdit = (entry: UTMEntry) => {
    setEditingItem(entry);
    formik.resetForm({ values: getUTMFormValues(entry) });
    modal.openModal();
  };

  const handleClose = () => {
    if (formik.isSubmitting) return;
    formik.resetForm({ values: getUTMFormValues() });
    setEditingItem(null);
    modal.closeModal();
  };

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-wrap justify-between items-center p-2">
          <PageBreadcrumb pageTitle="UTM Builder" projectName={projectName} />
          <Button size="sm" onClick={handleAdd} startIcon={<Plus className="w-4 h-4" />}>
            Add UTM
          </Button>
        </div>
        <div className="space-y-6">
          <UTMDashboard onEdit={handleEdit} />
        </div>
      </div>
      <UtmModal
        modal={{ isOpen: modal.isOpen, closeModal: handleClose }}
        editingItem={editingItem}
        formik={formik}
      />
    </div>
  );
};

export default UtmComponent;
