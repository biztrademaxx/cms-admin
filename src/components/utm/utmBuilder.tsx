"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";
import { useMutation } from "@apollo/client";
import { CreateUtmDocument } from "@/gql_generated/graphql";
import { usePathname } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { UTMEntry } from "./utm.types";
import { generateUTM } from "./common";

// Yup Validation Schema
const validationSchema = Yup.object().shape({
  url: Yup.string().url("Enter a valid URL").required("URL is required"),
  source: Yup.string().required("Source is required"),
  medium: Yup.string().required("Medium is required"),
  campaign: Yup.string().required("Campaign is required"),
  term: Yup.string(),
  content: Yup.string(),
});

export default function UTMBuilder({ data }: { data: UTMEntry }) {
  const pathname = usePathname();
  const { closeModal } = useModal();
  const projectSlug = pathname.split("/")[2] || "";
  const [SaveUTM] = useMutation(CreateUtmDocument, {
    onCompleted: (data) => {
      console.log("UTM saved successfully:", data);
      alert("UTM saved successfully!");
      closeModal();
    },
    refetchQueries: ["getUtmByProject"], // Adjust this based on your query name
    onError: (error) => {
      console.error("Error saving UTM:", error);
      alert("Failed to save UTM. Please try again.");
    },
  });

  const formik = useFormik({
    initialValues: {
      url: data?.url || "",
      source: data?.source || "",
      medium: data?.medium || "",
      campaign: data?.campaign || "",
      term: data?.term || "",
      content: data?.content || "",
    },
    validationSchema,
    onSubmit: async () => {
      try {
        if (!projectSlug) {
          alert("Project slug is required to save UTM.");
          return;
        }
        await SaveUTM({
          variables: {
            input: {
              ...formik.values,
              projectSlug,
            },
          },
        });
        formik.resetForm();
      } catch (error) {
        console.error("Error saving UTM:", error);
        alert("Failed to save UTM. Please try again.");
      }
    },
  });

  const handleCopy = async () => {
    const utm = generateUTM(formik.values);
    if (utm) {
      await navigator.clipboard.writeText(utm);
      alert("Copied UTM URL to clipboard.");
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] lg:p-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          {
            name: "url",
            label: "Website URL *",
            placeholder: "https://yourdomain.com/page",
          },
          { name: "source", label: "Source *", placeholder: "e.g. google" },
          { name: "medium", label: "Medium *", placeholder: "e.g. cpc" },
          {
            name: "campaign",
            label: "Campaign *",
            placeholder: "e.g. summer_sale",
          },
          { name: "term", label: "Term", placeholder: "e.g. shoes" },
          { name: "content", label: "Content", placeholder: "e.g. banner_ad" },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <Label>{label}</Label>
            <Input
              name={name}
              defaultValue={formik.values[name as keyof typeof formik.values]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={placeholder}
            />
            {formik.touched[name as keyof typeof formik.touched] &&
              formik.errors[name as keyof typeof formik.errors] && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors[name as keyof typeof formik.errors]}
                </p>
              )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Label>Generated UTM URL</Label>
        <TextArea
          className="bg-gray-50 text-sm rounded-xl mt-1 dark:bg-white/[0.03] dark:text-white"
          value={generateUTM(formik.values)}
        />
        <div className="mt-3 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleCopy}>
            Copy to Clipboard
          </Button>
          <Button type="submit">Save UTM</Button>
        </div>
      </div>
    </form>
  );
}
