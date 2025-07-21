"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "lucide-react";
import DatePicker from "@/components/form/date-picker";
import { useMutation, useQuery } from "@apollo/client";
import {
  CreateProjectDocument,
  GetProjectBySlugDocument,

} from "@/gql_generated/graphql";
import { useRouter, useSearchParams } from "next/navigation";
import { convertD24HrToISO, formatIsoToCustom } from "@/utils/dateUtils";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Project name is required"),
  slug: Yup.string().required("Slug is required"),
  year: Yup.string().required("Year is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
});

export default function CreateProjectForm() {
  const router = useRouter();
  const params = useSearchParams();
  const projectId = params.get("p") || "";

  const [CreateProject, { loading }] = useMutation(CreateProjectDocument, {
    onCompleted: (data) => {
      console.log("Project created:", data);
      router.push("/");
    },

    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });

  const { data: projectData, loading: projectLoading } = useQuery(
    GetProjectBySlugDocument,
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
      id: projectData?.getProjectBySlug?.id || "",
      name: projectData?.getProjectBySlug?.name || "",
      slug: projectData?.getProjectBySlug?.slug || "",
      year: projectData?.getProjectBySlug?.year || 2026,
      startDate: projectData?.getProjectBySlug?.startDate
        ? formatIsoToCustom(projectData?.getProjectBySlug?.startDate)
        : "",
      endDate: projectData?.getProjectBySlug?.endDate
        ? formatIsoToCustom(projectData?.getProjectBySlug?.endDate)
        : "",
      venue: projectData?.getProjectBySlug?.venue || "",
      currency: projectData?.getProjectBySlug?.currency || "INR",
      website: projectData?.getProjectBySlug?.website || "",
      description: projectData?.getProjectBySlug?.description || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const startDateIso = convertD24HrToISO(values.startDate);
        const endDateIso = convertD24HrToISO(values.endDate);
        await CreateProject({
          variables: {
            input: { ...values, startDate: startDateIso, endDate: endDateIso },
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

  const handleSelectChange = (selectedOption: any) => {
    formik.setFieldValue("currency", selectedOption.value);
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
            <p className="text-xs text-gray-400 mt-1">
              This will be used in the URL: /projects/[slug]
            </p>
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

          {/* Venue */}
          <div>
            <Label>Venue</Label>
            <Input
              name="venue"
              placeholder="e.g. ExCeL London"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.venue}
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
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
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
