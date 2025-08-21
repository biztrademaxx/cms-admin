import React, { useEffect } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";
import DropzoneComponent from "../form/DropZone";
import Select from "../form/Select";
// import { SponsorStatus } from "@/gql_generated/graphql";
import { ChevronDownIcon } from "lucide-react";

// const options = [
//   { value: ParticipantsStatus.Active, label: "Active" },
//   { value: ParticipantsStatus.Inactive, label: "Inactive" },
// ];

type ParticipantsModalProps = {
  modal: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  formik: any;
  editingItem: any | null;
  setEditingItem: (item: any | null) => void;
};

const ParticipantsModal = ({
  modal,
  formik,
  editingItem,
  setEditingItem,
}: ParticipantsModalProps) => {
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
            {editingItem ? "Edit Sponsor" : "Add Participant"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Fill out the Participants details below.
          </p>
        </div>

        <div className="px-2 flex overflow-y-auto custom-scrollbar">
          {!formik.values.logoUrl && (
            <div className="mb-6 ">
              <Label>Participant Company Logo</Label>
              <DropzoneComponent
                onImageUpload={(url) => {
                  formik.setFieldValue("logoUrl", url);
                }}
              />
            </div>
          )}
          {/* {!formik.values.imageUrl && (
            <div className="mb-6 ">
              <Label>Sponsor Cover Image</Label>
              <DropzoneComponent
                onImageUpload={(url) => {
                  formik.setFieldValue("logoUrl", url);
                }}
              />
            </div>
          )} */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            {formik.values.logoUrl && (
              <div>
                <Label>Participant Logo</Label>
                <div className="mt-3 flex items-start gap-4">
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
                </div>
              </div>
            )}
            {/* {formik.values.imageUrl && (
              <div>
                <Label>Sponsor Logo</Label>
                <div className="mt-3 flex items-start gap-4">
                  <img
                    src={formik.values.imageUrl}
                    alt="Logo Preview"
                    className="rounded max-w-[160px] max-h-[100px] object-contain border border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => formik.setFieldValue("imageUrl", "")}
                    className="text-sm text-red-500 underline hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )} */}
            {/* <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Company Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                hint={
                  formik.touched.companyName ? formik.errors.companyName : ""
                }
                error={formik.touched.companyName && formik.errors.companyName}
                onBlur={formik.handleBlur}
              />
            </div> */}
            <div>
              <Label>Booth No</Label>
              <Input
                type="text"
                name="boothNumber"
                placeholder="Booth Number"
                value={formik.values.boothNumber}
                onChange={formik.handleChange}
                hint={
                  formik.touched.boothNumber ? formik.errors.boothNumber : ""
                }
                error={formik.touched.boothNumber && formik.errors.boothNumber}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <Label>Type</Label>
              <Input
                type="text"
                name="type"
                placeholder="Platinum, Gold, Silver, Bronze, etc."
                onBlur={formik.handleBlur}
                hint={formik.touched.type ? formik.errors.type : ""}
                error={formik.touched.type && formik.errors.type}
                value={formik.values.type}
                onChange={formik.handleChange}
              />
            </div>
            {/* <div>
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
            </div> */}
          </div>
          <div className="mt-6">
            <Label>Address</Label>
            <TextArea
              name="address"
              placeholder="Address"
              value={formik.values.address}
              onBlur={formik.handleBlur}
              hint={formik.touched.address ? formik.errors.address : ""}
              error={formik.touched.address && formik.errors.address}
              onChange={formik.handleChange}
            />
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
            {editingItem ? "Update" : "Add"} Participant
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ParticipantsModal;
