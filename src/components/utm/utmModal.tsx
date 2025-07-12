import React from "react";
import { Modal } from "../ui/modal";
import UTMBuilder from "./utmBuilder";
import { UTMEntry } from "./utm.types";

type AgendaMOdalProps = {
  isOpen: boolean;
  closeModal: () => void;
  data: UTMEntry
};

const UtmModal = ({ isOpen, closeModal, data }: AgendaMOdalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <UTMBuilder data={data} />
    </Modal>
  );
};

export default UtmModal;
