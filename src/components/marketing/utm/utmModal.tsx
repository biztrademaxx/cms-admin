import React from "react";
import { Modal } from "../../ui/modal";
import { UTMEntry } from "./utm.types";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";
import { generateUTM } from "./common";

type UTMModalProps = {
  modal: {
    isOpen: boolean;
    closeModal: () => void;
  }
  editingItem: UTMEntry | any;
  formik: any;
};

export default function UtmModal({
  modal,
  formik,
  editingItem,
}: UTMModalProps) {
  const { closeModal, isOpen } = modal;
  const handleCopy = async () => {
    const utm = generateUTM(formik.values);
    if (utm) {
      await navigator.clipboard.writeText(utm);
      alert("Copied UTM URL to clipboard.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
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
            {
              name: "content",
              label: "Content",
              placeholder: "e.g. banner_ad",
            },
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
            name="url"
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
    </Modal>
  );
}
