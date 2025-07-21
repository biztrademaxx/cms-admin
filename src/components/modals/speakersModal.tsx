import React, { useEffect } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

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
    }else{
      formik.resetForm();
    }
  }, [editingItem]);
  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
      <form
        onSubmit={formik.handleSubmit}
        className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11"
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
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                hint={formik.touched.name ? formik.errors.name : ""}
                error={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
              />
            </div>

            <div>
              <Label>Profile Picture URL</Label>
              <Input
                type="text"
                name="image"
                placeholder="https://example.com/logo.png"
                error={formik.touched.image && formik.errors.image}
                onBlur={formik.handleBlur}
                hint={formik.touched.image ? formik.errors.image : ""}
                value={formik.values.image}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <Label>Designation</Label>
              <Input
                type="text"
                name="designation"
                placeholder="designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                hint={
                  formik.touched.designation ? formik.errors.designation : ""
                }
                error={formik.touched.designation && formik.errors.designation}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="companyName"
                placeholder="company Name"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                hint={
                  formik.touched.companyName ? formik.errors.companyName : ""
                }
                error={formik.touched.companyName && formik.errors.companyName}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <Label>Organization Logo URL</Label>
              <Input
                type="text"
                name="companyLogo"
                placeholder="https://example.com/logo.png"
                error={formik.touched.companyLogo && formik.errors.companyLogo}
                onBlur={formik.handleBlur}
                hint={
                  formik.touched.companyLogo ? formik.errors.companyLogo : ""
                }
                value={formik.values.companyLogo}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <Label>Linkedin URL</Label>
              <Input
                type="text"
                name="linkedinUrl"
                placeholder="https://example.com"
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
