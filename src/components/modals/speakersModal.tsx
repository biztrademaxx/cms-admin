import React, { useEffect } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import DropzoneComponent from "../form/DropZone";
import Select from "../form/Select";
import { ChevronDownIcon } from "lucide-react";
import { Status } from "@/gql_generated/graphql";

const options = [
  { value: Status.Active, label: "Active" },
  { value: Status.Inactive, label: "Inactive" },
  { value: Status.Pending, label: "Pending" },
];           

type SpeakersModalProps = {
  modal: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  formik: any;
  editingItem: any | null;
  setEditingItem: (item: any | null) => void;
};

const SpeakersModal = ({
  modal,
  formik,
  editingItem,
  setEditingItem,
}: SpeakersModalProps) => {
  const { isOpen, closeModal } = modal;

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
  }, [editingItem]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
      <form
        onSubmit={formik.handleSubmit}
        className="relative w-full p-4 overflow-y-auto bg-white h-[80vh] no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11"
      >
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {editingItem ? "Edit Speaker" : "Add Speaker"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Fill out the speaker details below.
          </p>
        </div>

        <div className="px-2 overflow-y-auto custom-scrollbar">
<div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">


        <div>
            {/* Profile Picture */}
          {formik.values.image ? (
            <div className="mb-6">
              <Label>Profile Picture</Label>
              <div className="mt-3 flex items-start gap-4">
                <img
                  src={formik.values.image}
                  alt="Profile Preview"
                  className="rounded max-w-[160px] max-h-[100px] object-contain border border-gray-200 dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => formik.setFieldValue("image", "")}
                  className="text-sm text-red-500 underline hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <Label>Profile Picture</Label>
              <DropzoneComponent
                onImageUpload={(url) => {
                  formik.setFieldValue("image", url);
                }}
              />
              {formik.touched.image && formik.errors.image && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.image}
                </p>
              )}
            </div>
          )}
      </div>

                      <div>
              {/* Organization Logo */}
              {formik.values.companyLogo ? (
                <div className="mb-6">
                  <Label>Organization Logo</Label>
                  <div className="mt-3 flex items-start gap-4">
                    <img
                      src={formik.values.companyLogo}
                      alt="Logo Preview"
                      className="rounded max-w-[160px] max-h-[100px] object-contain border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => formik.setFieldValue("companyLogo", "")}
                      className="text-sm text-red-500 underline hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <Label>Organization Logo</Label>
                  <DropzoneComponent
                    onImageUpload={(url) => {
                      formik.setFieldValue("companyLogo", url);
                    }}
                  />
                  {formik.touched.companyLogo && formik.errors.companyLogo && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.companyLogo}
                    </p>
                  )}
                </div>
              )}
            </div>
</div>


          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                hint={formik.touched.name ? formik.errors.name : ""}
                error={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
              />
            </div>

            
 <div>
              <Label>Status</Label>
              <div className="relative">
                <Select
                  options={options}
                  placeholder="Select Status"
                  defaultValue={formik.values.status}
                  onChange={formik.handleChange}
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>


            <div>
              <Label>Designation</Label>
              <Input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                hint={formik.touched.designation ? formik.errors.designation : ""}
                error={formik.touched.designation && formik.errors.designation}
                onBlur={formik.handleBlur}
              />
            </div>

            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                hint={formik.touched.companyName ? formik.errors.companyName : ""}
                error={formik.touched.companyName && formik.errors.companyName}
                onBlur={formik.handleBlur}
              />
            </div>



            <div>
              <Label>LinkedIn URL</Label>
              <Input
                type="text"
                name="linkedinUrl"
                placeholder="https://linkedin.com/in/username"
                onBlur={formik.handleBlur}
                hint={
                  formik.touched.linkedinUrl ? formik.errors.linkedinUrl : ""
                }
                error={formik.touched.linkedinUrl && formik.errors.linkedinUrl}
                value={formik.values.linkedinUrl}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button size="sm" type="submit" disabled={formik.isSubmitting}>
            {editingItem ? "Update" : "Add"} Speaker
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SpeakersModal;
