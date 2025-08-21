"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import { ChevronDownIcon, Currency } from "lucide-react";
import DatePicker from "@/components/form/date-picker";
import { useMutation, useQuery } from "@apollo/client";
import {
  CreateProjectDocument,
  GetAllProjectsDocument,
  GetProjectByIdDocument,
  ProjectStatus,
} from "@/gql_generated/graphql";
import { useRouter, useSearchParams } from "next/navigation";
import { convertD24HrToISO, formatIsoToCustom } from "@/utils/dateUtils";
import DropzoneComponent from "@/components/form/DropZone";
import { base64ToFile, isBase64, uploadImageToCloud } from "@/utils/imageUtils";
import Image from "next/image";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Project name is required"),
  logoUrl: Yup.string().required("Logo URL is required"),
  slug: Yup.string().required("Slug is required"),
  year: Yup.string().required("Year is required"),
  currency: Yup.string().required("Currency is required"),
});

export default function CreateProjectForm() {
  const router = useRouter();
  const params = useSearchParams();
  const projectId = params.get("p") || "";

  const [CreateProject, { loading }] = useMutation(CreateProjectDocument, {
    refetchQueries: [
      {
        query: GetAllProjectsDocument,
      },
    ],
    onCompleted: (data) => {
      console.log("Project created:", data);
      router.push("/");
    },

    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });

  const { data: projectData, loading: projectLoading } = useQuery(
    GetProjectByIdDocument,
    {
      variables: {
        id: projectId,
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      skip: !projectId,
    }
  );

  const formik = useFormik({
    initialValues: {
      id: projectData?.getProjectById?.id || "",
      name: projectData?.getProjectById?.name || "",
      slug: projectData?.getProjectById?.slug || "",
      bannerUrl: projectData?.getProjectById?.bannerUrl || "",
      year: projectData?.getProjectById?.year || 2025,
      logoUrl: projectData?.getProjectById?.logoUrl || "",
      startDate: projectData?.getProjectById?.startDate
        ? formatIsoToCustom(projectData?.getProjectById?.startDate)
        : "",
      endDate: projectData?.getProjectById?.endDate
        ? formatIsoToCustom(projectData?.getProjectById?.endDate)
        : "",
      location: projectData?.getProjectById?.location || "",
      currency: projectData?.getProjectById?.currency || "INR",
      website: projectData?.getProjectById?.website || "",
      projectStatus: projectData?.getProjectById?.status || "ONGOING",
      description: projectData?.getProjectById?.description || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        let logoFileOrUrl = formik.values.logoUrl;
        let bannerFileOrUrl = formik.values.bannerUrl;

        if (typeof logoFileOrUrl === "string" && isBase64(logoFileOrUrl)) {
          const file = base64ToFile(logoFileOrUrl, "uploaded-image.png");
          logoFileOrUrl = await uploadImageToCloud(file);
        }

        if (typeof bannerFileOrUrl === "string" && isBase64(bannerFileOrUrl)) {
          const file = base64ToFile(bannerFileOrUrl, "uploaded-image.png");
          bannerFileOrUrl = await uploadImageToCloud(file);
        }
        const startDateIso = new Date(values.startDate);
        const endDateIso = new Date(values.endDate);
        const yearToNum = Number(values.year);
        await CreateProject({
          variables: {
            input: {
              ...values,
              logoUrl: logoFileOrUrl,
              startDate: startDateIso,
              endDate: endDateIso,
              year: yearToNum,
              bannerUrl: bannerFileOrUrl,
            },
          },
        });
      } catch (error) {
        console.error("Error creating project:", error);
      }
    },
  });

  console.log(formik.values.startDate);
  const options = [
    { value: "GBP", label: "GBP" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "INR", label: "INR" },
  ];

  const statusOptions = [
    { value: "ONGOING", label: "Ongoing" },
    { value: "COMPLETED", label: "Completed" },
    { value: "UPCOMING", label: "Upcoming" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  const handleSelectChange = (type: string, selectedOption: any) => {
    formik.setFieldValue(type, selectedOption.value);
  };

  if (projectId && projectLoading) {
    return <div>Loading project...</div>;
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={formik.handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] lg:p-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formik.values.logoUrl ? (
            <div>
              <Label>Project Logo</Label>
              <div className="my-3 flex items-start gap-4">
                <img
                  src={formik.values.logoUrl}
                  alt="Logo Preview"
                  className="rounded max-w-[160px] max-h-[100px] object-contain border border-gray-200 dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => formik.setFieldValue("logoUrl", "")}
                  className="text-sm text-red-500 underline hover:text-red-600"
                >
                  Remove
                </button>
                {formik.touched.logoUrl && formik.errors.logoUrl && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.logoUrl}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-6 ">
              <Label>Project Logo</Label>
              <DropzoneComponent
                onImageUpload={(url) => {
                  formik.setFieldValue("logoUrl", url);
                }}
              />
            </div>
          )}
          {formik.values.bannerUrl ? (
            <div>
              <Label>Project Banner</Label>
              <div className="my-3 flex items-start gap-4">
                <img
                  src={formik.values.bannerUrl}
                  alt="banner Preview"
                  className="rounded max-w-[160px] max-h-[100px] object-contain border border-gray-200 dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => formik.setFieldValue("bannerUrl", "")}
                  className="text-sm text-red-500 underline hover:text-red-600"
                >
                  Remove
                </button>
                {formik.touched.bannerUrl && formik.errors.bannerUrl && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.bannerUrl}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-6 ">
              <Label>Project Banner</Label>
              <DropzoneComponent
                onImageUpload={(url) => {
                  formik.setFieldValue("bannerUrl", url);
                }}
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div>
            <Label>Project Name *</Label>
            <Input
              name="name"
              placeholder="e.g. Bio Technology Show"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <Label>Slug *</Label>
            <Input
              name="slug"
              placeholder="e.g. bio-technology-show"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.slug}
            />
            {formik.touched.slug && formik.errors.slug && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.slug}</p>
            )}
          </div>

          {/* Year */}
          <div>
            <Label>Year *</Label>
            <Input
              name="year"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.year}
            />
          </div>

          <div>
            <Label>Status</Label>
            <div className="relative">
              <Select
                options={statusOptions}
                placeholder="Select an option"
                defaultValue={formik.values.projectStatus}
                onChange={(e) => handleSelectChange("projectStatus", e)}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
            {formik.touched.projectStatus && formik.errors.projectStatus && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.projectStatus}
              </p>
            )}
          </div>

          {/* location */}
          <div>
            <Label>location</Label>
            <Input
              name="location"
              placeholder="e.g. ExCeL London"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
          </div>

          {/* Start Date */}
          <div>
            <Label>Start Date *</Label>
            <div>
              <DatePicker
                id="start-time-date-picker"
                defaultDate={formik.values.startDate}
                placeholder="Select start date"
                onChange={(dates, currentDateString) => {
                  formik.setFieldTouched("startDate", true);
                  formik.setFieldValue("startDate", currentDateString);
                }}
              />
            </div>
            {formik.touched.startDate && formik.errors.startDate && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.startDate}
              </p>
            )}
          </div>

          {/* End Date */}
          <div>
            <Label>End Date *</Label>
            <div>
              <DatePicker
                id="end-time-date-picker"
                defaultDate={formik.values.endDate}
                placeholder="Select end date"
                onChange={(dates, currentDateString) => {
                  formik.setFieldTouched("endDate", true);
                  formik.setFieldValue("endDate", currentDateString);
                }}
              />
            </div>
            {formik.touched.endDate && formik.errors.endDate && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.endDate}
              </p>
            )}
          </div>

          {/* Currency */}
          <div>
            <Label>Currency</Label>
            <div className="relative">
              <Select
                options={options}
                placeholder="Select an option"
                defaultValue={formik.values.currency}
                onChange={(e) => handleSelectChange("currency", e)}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
            {formik.touched.currency && formik.errors.currency && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.currency}
              </p>
            )}
          </div>

          {/* Website */}
          <div>
            <Label>Website</Label>
            <Input
              name="website"
              placeholder="https://example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.website}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Label>Description</Label>
            <TextArea
              name="description"
              rows={3}
              placeholder="Enter a description of the event..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-2 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!formik.isValid || loading}>
            {projectId ? "Update" : "Create"} Project
          </Button>
        </div>
      </form>
    </div>
  );
}
