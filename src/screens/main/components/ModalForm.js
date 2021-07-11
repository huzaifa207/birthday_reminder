import React, { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";

const ModalForm = ({
  handleSubmit,
  handleFile,
  modal,
  closeModal,
  nameRef,
  dateRef,
  fileRef,
  fileName,
}) => {
  useEffect(() => {
    bsCustomFileInput.init();
  }, []);
  return (
    <Modal show={modal} onHide={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required ref={nameRef} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" required ref={dateRef} />
          </Form.Group>

          <Form.Group className="custom-file mb-2">
            <Form.Control
              type="file"
              accept="image/*"
              ref={fileRef}
              className="custom-file-input"
              onChange={handleFile}
            />
            <Form.Label className="custom-file-label">{fileName}</Form.Label>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} variant="secondary">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Birthday
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalForm;
