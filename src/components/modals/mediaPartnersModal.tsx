import React, { useEffect } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";
import DropzoneComponent from "../form/DropZone";
import {  PartnerType, Status } from "@/gql_generated/graphql";
import Select from "../form/Select";
import { ChevronDownIcon } from "lucide-react";


const options = [
  { value: Status.Active, label: "Active" },
  { value: Status.Inactive, label: "Inactive" },
  { value: Status.Pending, label: "Pending" },
];  


const partnerOptions = [
  { value: PartnerType.Media, label: "Media" },
  { value: PartnerType.Supporting, label: "Supporting" },
  { value: PartnerType.Strategic, label: "Strategic" },
  { value: PartnerType.Community, label: "Community" },
];
type MediaPartnersModalProps = {
  modal: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  formik: any;
  editingItem: any | null;
  setEditingItem: (item: any | null) => void;
};

const MediaPartnersModal = ({
  modal,
  formik,
  editingItem,
  setEditingItem,
}: MediaPartnersModalProps) => {
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
            {editingItem ? "Edit Media Partner" : "Add Media Partner"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Fill out the media partner details below.
          </p>
        </div>

        <div className="px-2 overflow-y-auto custom-scrollbar">
          {/* Logo Upload */}
          {!formik.values.logoUrl && (
            <div className="mb-6">
              <Label>Media Partner Logo</Label>
              <DropzoneComponent
                onImageUpload={(url) => {
                  formik.setFieldValue("logoUrl", url);
                }}
              />
            </div>
          )}

          {formik.values.logoUrl && (
            <div className="mb-6">
              <Label>Media Partner Logo</Label>
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

          {/* Name */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Media Partner Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                hint={formik.touched.name ? formik.errors.name : ""}
                error={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
              />
            </div>
                        <div>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                hint={formik.touched.address ? formik.errors.address : ""}
                error={formik.touched.address && formik.errors.address}
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
              <Label>Partner Type</Label>
              <div className="relative">
                <Select
                  options={partnerOptions}
                  placeholder="Select Type Of Partner"
                  defaultValue={formik.values.partnerType}
                  onChange={formik.handleChange}
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

   

                        <div>
              <Label>Booth Number</Label>
              <Input
                type="text"
                name="boothNumber"
                placeholder="Booth Number"
                value={formik.values.boothNumber}
                onChange={formik.handleChange}
                hint={formik.touched.boothNumber ? formik.errors.boothNumber : ""}
                error={formik.touched.boothNumber && formik.errors.boothNumber}
                onBlur={formik.handleBlur}
              />
            </div>

                        <div>
              <Label>Contact Email</Label>
              <Input
                type="text"
                name="contactEmail"
                placeholder="Contact Email"
                value={formik.values.contactEmail}
                onChange={formik.handleChange}
                hint={formik.touched.contactEmail ? formik.errors.contactEmail : ""}
                error={formik.touched.contactEmail && formik.errors.contactEmail}
                onBlur={formik.handleBlur}
              />
            </div>

                        <div>
              <Label>Contact Name</Label>
              <Input
                type="text"
                name="contactName"
                placeholder="Contact Name"
                value={formik.values.contactName}
                onChange={formik.handleChange}
                hint={formik.touched.contactName ? formik.errors.contactName : ""}
                error={formik.touched.contactName && formik.errors.contactName}
                onBlur={formik.handleBlur}
              />
            </div>

                        <div>
              <Label>Contact Title</Label>
              <Input
                type="text"
                name="contactTitle"
                placeholder="Contact Title"
                value={formik.values.contactTitle}
                onChange={formik.handleChange}
                hint={formik.touched.contactTitle ? formik.errors.contactTitle : ""}
                error={formik.touched.contactTitle && formik.errors.contactTitle}
                onBlur={formik.handleBlur}
              />
            </div>

                        <div>
              <Label>Hide From Participant</Label>
              <Input
                type="text"
                name="hideFromParticipants"
                placeholder="Hide From Participants"
                value={formik.values.hideFromParticipant}
                onChange={formik.handleChange}
                hint={formik.touched.hideFromParticipant ? formik.errors.hideFromParticipant : ""}
                error={formik.touched.hideFromParticipant && formik.errors.hideFromParticipant}
                onBlur={formik.handleBlur}
              />
            </div>

                        <div>
              <Label>Linkedin Url</Label>
              <Input
                type="text"
                name="linkedinUrl"
                placeholder="Linkedin Url"
                value={formik.values.linkedinUrl}
                onChange={formik.handleChange}
                hint={formik.touched.linkedinUrl ? formik.errors.linkedinUrl : ""}
                error={formik.touched.linkedinUrl && formik.errors.linkedinUrl}
                onBlur={formik.handleBlur}
              />
            </div>

                        {/* <div>
              <Label>Partner Type</Label>
              <Input
                type="text"
                name="partnerType"
                placeholder="Partner Type"
                value={formik.values.partnerType}
                onChange={formik.handleChange}
                hint={formik.touched.partnerType ? formik.errors.partnerType : ""}
                error={formik.touched.partnerType && formik.errors.partnerType}
                onBlur={formik.handleBlur}
              />
            </div> */}
            

            

            {/* Website */}
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                placeholder="https://example.com"
                value={formik.values.website}
                onChange={formik.handleChange}
                hint={formik.touched.website ? formik.errors.website : ""}
                error={formik.touched.website && formik.errors.website}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <Label>Description</Label>
            <TextArea
              name="description"
              placeholder="Short description about the Media Partner"
              value={formik.values.description}
              onChange={formik.handleChange}
              hint={formik.touched.description ? formik.errors.description : ""}
              error={formik.touched.description && formik.errors.description}
              onBlur={formik.handleBlur}
            />
          </div>
          
          
        </div>

        
        

        {/* Footer Buttons */}
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
            {editingItem ? "Update" : "Add"} Media Partner
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MediaPartnersModal;
