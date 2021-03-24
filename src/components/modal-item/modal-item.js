import React from "react";
import { Modal, Button } from "react-bootstrap";
import ModalForm from "./modal-form";
import { useModal } from "../../hooks";

const ModalItem = ({ handleReload }) => {
  const [modalState, dispatchModalState] = useModal();
  const { item, isShow } = modalState;
  console.log(item);

  const handleCloseModal = () => dispatchModalState({ type: "CLOSE" });

  return (
    <Modal show={isShow} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm
          item={item}
          handleReload={handleReload}
          onClose={handleCloseModal}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalItem;
