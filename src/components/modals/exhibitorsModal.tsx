import React, { useEffect } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";

type ExhibitorsModalProps = {
  modal: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  formik: any;
  editingItem: any | null;
};

const ExhibitorsModal = ({
  modal,
  formik,
  editingItem,
}: ExhibitorsModalProps) => {
  const { isOpen, closeModal } = modal;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        formik.resetForm();
        closeModal();
      }}
      className="max-w-[700px] m-4"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11"
      >
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {editingItem ? "Edit Exhibitor" : "Add Exhibitor"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Fill out the exhibitor details below.
          </p>
        </div>

        <div className="px-2 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                hint={formik.errors.companyName}
                error={formik.touched.companyName && formik.errors.companyName}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <Label>LinkedIn URL</Label>
              <Input
                type="text"
                name="linkedin"
                placeholder="https://linkedin.com/"
                value={formik.values.linkedin}
                onChange={formik.handleChange}
                hint={formik.errors.linkedin}
                error={formik.touched.linkedin && formik.errors.linkedin}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <Label>Logo URL</Label>
              <Input
                type="text"
                name="logoUrl"
                placeholder="https://example.com/logo.png"
                error={formik.touched.logoUrl && formik.errors.logoUrl}
                onBlur={formik.handleBlur}
                hint={formik.errors.logoUrl}
                value={formik.values.logoUrl}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                placeholder="https://example.com"
                onBlur={formik.handleBlur}
                hint={formik.errors.website}
                error={formik.touched.website && formik.errors.website}
                value={formik.values.website}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <Label>Description</Label>
            <TextArea
              name="description"
              placeholder="Short description about the exhibitor"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              hint={formik.errors.description}
              error={formik.touched.description && formik.errors.description}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => {
              closeModal();
              formik.resetForm();
            }}
          >
            Cancel
          </Button>
          <Button size="sm" type="submit">
            {editingItem ? "Update" : "Add"} Exhibitor
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExhibitorsModal;
