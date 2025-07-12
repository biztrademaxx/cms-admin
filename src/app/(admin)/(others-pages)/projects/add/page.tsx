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
import { useMutation } from "@apollo/client";
import { CreateProjectDocument } from "@/gql_generated/graphql";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Project name is required"),
  slug: Yup.string().required("Slug is required"),
  year: Yup.string().required("Year is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
});

export default function CreateProjectForm() {
  const router = useRouter();
  const [CreateProject] = useMutation(CreateProjectDocument,{
    onCompleted: (data) => {
      console.log("Project created:", data);
      alert("Project created successfully!");
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      year: 2025,
      startDate: "",
      endDate: "",
      venue: "",
      currency: "GBP",
      website: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted:", values);
      const startDateIso = new Date(formik.values.startDate).toISOString();
      const endDateIso = new Date(formik.values.endDate).toISOString();
      await CreateProject({
        variables: {
          input: { ...values, startDate: startDateIso, endDate: endDateIso },
        },
      });
    },
  });

  const options = [
    { value: "GBP", label: "GBP" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "INR", label: "INR" },
  ];

  const handleSelectChange = (selectedOption: any) => {
    formik.setFieldValue("currency", selectedOption.value);
  };

  return (
    <div className="space-y-8">
      <form
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
              defaultValue={formik.values.name}
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
              defaultValue={formik.values.slug}
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
              defaultValue={formik.values.year}
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
              defaultValue={formik.values.venue}
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
              defaultValue={formik.values.website}
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
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" onClick={() => formik.submitForm()}>Create Project</Button>
        </div>
      </form>
    </div>
  );
}
