import React, { useEffect } from "react";
import { Modal } from "../../ui/modal";
import { UTMEntry } from "./utm.types";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";
import { generateUTM } from "./common";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "lucide-react";

type UTMModalProps = {
  modal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  editingItem: UTMEntry | null;
  formik: any;
  setEditingItem: (item: UTMEntry | null) => void;
};

type Option = { value: string; label: string };
const medium = [{
  value: "brochure", label: "Brochure"
}, {
  value: "social media", label: "Social Media",
},
{
  value: "email", label: "Email"
},
{
  value: "affiliate", label: "Affiliate"
},
{
  value: "blogs", label: "Blogs"
},
{
  value: "google", label: "Google"
},
{
  value: "media partnerships", label: "Media Partnerships"
},
{
  value: "referral", label: "Referral"
},
{
  value: "other", label: "Other"
}
  ,
]
const mediumOptions: { [key: string]: Option[] } = {
  brochure: [
    { value: "brochure_pdf", label: "Brochure PDF" },
    { value: "physical_brochure", label: "Physical Brochure" },
  ],
  "social media": [
    { value: "facebook", label: "Facebook" },
    { value: "meta_ads", label: "Meta Ads" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter" },
  ],
  email: [
    { value: "newsletter", label: "Newsletter" },
    { value: "cold_email", label: "Cold Email" },
    { value: "email_campaign", label: "Email Campaign" },
  ],
  affiliate: [
    { value: "affiliate_partner_1", label: "Affiliate Partner 1" },
    { value: "affiliate_partner_2", label: "Affiliate Partner 2" },
  ],
  blogs: [
    { value: "company_blog", label: "Company Blog" },
    { value: "guest_blog", label: "Guest Blog" },
  ],
  google: [
    { value: "google_ads", label: "Google Ads" },
    { value: "google_organic", label: "Google Organic" },
  ],
  "media partnerships": [
    { value: "partner_site_1", label: "Partner Site 1" },
    { value: "partner_site_2", label: "Partner Site 2" },
  ],
  referral: [
    { value: "customer_referral", label: "Customer Referral" },
    { value: "employee_referral", label: "Employee Referral" },
  ],
  other: [{ value: "other", label: "Other Source" }],
};

export default function UtmModal({
  modal,
  formik,
  editingItem,
  setEditingItem,
}: UTMModalProps) {
  const { closeModal, isOpen } = modal;

  const handleCopy = async () => {
    const utm = generateUTM(formik.values);
    if (utm) {
      await navigator.clipboard.writeText(utm);
      alert("Copied UTM URL to clipboard.");
    }
  };

  const handleClose = () => {
    formik.resetForm();
    setEditingItem(null);
    closeModal();
  };

  useEffect(() => {
    if (editingItem) {
      formik.setValues(editingItem);
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingItem]);


  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
      <form
        onSubmit={formik.handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] lg:p-12"
      >
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {editingItem ? "Edit UTM" : "Add UTM"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Fill out the UTM details below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Website URL */}
          <div>
            <Label>Website URL *</Label>
            <Input
              name="url"
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="https://yourdomain.com/page"
            />
            {formik.touched.url && formik.errors.url && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.url}</p>
            )}
          </div>

{/* Medium Dropdown */}
<div>
  <Label>Medium *</Label>
  <div className="relative">
    <Select
      options={medium}
      placeholder="Select an option"
      defaultValue={formik.values.medium}   // <-- pass string
      onChange={(value) => formik.setFieldValue("medium", value)}
      className="dark:bg-dark-900"
    />
    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
      <ChevronDownIcon />
    </span>
  </div>
  {formik.touched.medium && formik.errors.medium && (
    <p className="mt-1 text-xs text-red-500">{formik.errors.medium}</p>
  )}
</div>

{/* Source Dropdown */}
<div>
  <Label>Source *</Label>
  <div className="relative">
    <Select
      options={mediumOptions[formik.values.medium ?? "other"]}
      placeholder="Select an option"
      defaultValue={formik.values.source}   // <-- pass string
      onChange={(value) => formik.setFieldValue("source", value)}
      className="dark:bg-dark-900"
    />
    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
      <ChevronDownIcon />
    </span>
  </div>
  {formik.touched.source && formik.errors.source && (
    <p className="mt-1 text-xs text-red-500">{formik.errors.source}</p>
  )}
</div>


          {/* Campaign */}
          <div>
            <Label>Campaign *</Label>
            <Input
              name="campaign"
              value={formik.values.campaign}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. summer_sale"
            />
            {formik.touched.campaign && formik.errors.campaign && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.campaign}
              </p>
            )}
          </div>

          {/* Term */}
          <div>
            <Label>Term</Label>
            <Input
              name="term"
              value={formik.values.term}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. shoes"
            />
          </div>

          {/* Content */}
          <div>
            <Label>Content</Label>
            <Input
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. banner_ad"
            />
          </div>
        </div>

        {/* Generated UTM */}
        <div className="mt-6">
          <Label>Generated UTM URL</Label>
          <TextArea
            name="generatedUrl"
            className="bg-gray-50 text-sm rounded-xl mt-1 dark:bg-white/[0.03] dark:text-white"
            value={generateUTM(formik.values)}
            readOnly
          />


          <div className="mt-3 flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button size="sm" type="submit">
              {editingItem ? "Update" : "Add"} UTM
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
