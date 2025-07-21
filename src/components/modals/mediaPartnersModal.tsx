import React, { useEffect } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";

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
            {editingItem ? "Edit Media Partner" : "Add Media Partner"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Fill out the media partner details below.
          </p>
        </div>

        <div className="px-2 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>name</Label>
              <Input
                type="text"
                name="name"
                placeholder="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                hint={
                  formik.touched.name ? formik.errors.name : ""
                }
                error={formik.touched.name && formik.errors.name}
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
                hint={formik.touched.logoUrl ? formik.errors.logoUrl : ""}
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
                hint={formik.touched.website ? formik.errors.website : ""}
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
              placeholder="Short description about the MediaPartner"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              hint={formik.touched.description ? formik.errors.description : ""}
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
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button size="sm" type="submit" disabled={formik.isSubmitting}>
            {editingItem ? "Update" : "Add"} MediaPartner
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MediaPartnersModal;
