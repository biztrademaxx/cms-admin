import React, { useEffect } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";
import DropzoneComponent from "../form/DropZone";
import Select from "../form/Select";
import { ChevronDownIcon } from "lucide-react";
import { Status } from "@/gql_generated/graphql";


const options = [
  { value: Status.Active, label: "Active" },
  { value: Status.Inactive, label: "Inactive" },
  { value: Status.Pending, label: "Pending" },
];  
type SupportingPartnersModalProps = {
  modal: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  formik: any;
  editingItem: any | null;
  setEditingItem: (item: any | null) => void;
};

const SupportingPartnersModal = ({
  modal,
  formik,
  editingItem,
  setEditingItem,
}: SupportingPartnersModalProps) => {
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
            {editingItem ? "Edit Supporting Partner" : "Add Supporting Partner"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Fill out the supporting partner details below.
          </p>
        </div>

        <div className="px-2 overflow-y-auto custom-scrollbar">
          {/* Logo Upload */}
          {formik.values.logoUrl ? (
            <div className="mb-6">
              <Label>Supporting Partner Logo</Label>
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
          ):(
            <div className="mb-6">
              <Label>Supporting Partner Logo</Label>
              <DropzoneComponent
                onImageUpload={(url) => {
                  formik.setFieldValue("logoUrl", url);
                }}
              />
               {formik.touched.logoUrl && formik.errors.logoUrl && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.logoUrl}</p>
            )}
            </div>
          
            
          )}

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Partner Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                hint={formik.touched.name ? formik.errors.name : ""}
                error={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
              />
            </div>



            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                placeholder="https://example.com"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                hint={formik.touched.website ? formik.errors.website : ""}
                error={formik.touched.website && formik.errors.website}
              />
            </div>

                        <div>
              <Label>Linkedin</Label>
              <Input
                type="text"
                name="linkedinUrl"
                placeholder="https://linkedin.com"
                value={formik.values.linkedinUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                hint={formik.touched.linkedinUrl ? formik.errors.linkedinUrl : ""}
                error={formik.touched.linkedinUrl && formik.errors.linkedinUrl}
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



            {/* / */}

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
                value={formik.values. contactTitle}
                onChange={formik.handleChange}
                hint={formik.touched. contactTitle ? formik.errors.  contactTitle : ""}
                error={formik.touched.  contactTitle && formik.errors.  contactTitle}
                onBlur={formik.handleBlur}
              />
            </div>

            
                                  <div>
              <Label>Featured</Label>
              <Input
                type="text"
                name="featured"
                placeholder="Featured"
                value={formik.values. featured}
                onChange={formik.handleChange}
                hint={formik.touched. featured ? formik.errors.  featured : ""}
                error={formik.touched.  featured && formik.errors.  featured}
                onBlur={formik.handleBlur}
              />
            </div>

            
                                  <div>
              <Label>Hide From Participants</Label>
              <Input
                type="text"
                name="hideFromParticipants"
                placeholder="Hide From Participants"
                value={formik.values. hideFromParticipant}
                onChange={formik.handleChange}
                hint={formik.touched. hideFromParticipant ? formik.errors.  hideFromParticipant : ""}
                error={formik.touched.  hideFromParticipant && formik.errors.  hideFromParticipant}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className="mt-6">
            <Label>Description</Label>
            <TextArea
              name="description"
              placeholder="Short description about the Supporting Partner"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              hint={formik.touched.description ? formik.errors.description : ""}
              error={formik.touched.description && formik.errors.description}
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
            {editingItem ? "Update" : "Add"} Supporting Partner
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SupportingPartnersModal;
