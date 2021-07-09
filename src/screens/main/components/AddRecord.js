import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";

import { useAuth } from "../../../context/AuthContext";

import { storage, db } from "../../../firebase";

import { calendar, months } from "../functions/calendar";

const AddRecord = () => {
  const [modal, setModal] = useState(false);
  const [fileName, setFileName] = useState("Person's Picture");
  const nameRef = useRef();
  const monthRef = useRef();
  const dateRef = useRef();
  const fileRef = useRef();
  const [newDates, setNewDates] = useState([]);

  const { currentUser } = useAuth();

  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    const name = nameRef.current.value;
    const date = dateRef.current.value;
    const month = monthRef.current.value;

    const uploadFile = storage
      .ref(`/files/${currentUser.uid}/${fileName}`)
      .put(file);

    uploadFile.on(
      "state_changed",
      (snapshot) => {},
      () => {},
      () => {
        uploadFile.snapshot.ref.getDownloadURL().then((url) => {
          db.birthdays.add({
            userId: currentUser.uid,
            personName: name,
            date: date,
            month: month,
            fileName: fileName,
            picture: url,
            date_created: db.getCurrentTimestamp(),
          });
        });
      }
    );
    setFileName("Person's Picture");
    closeModal();
  };

  const handleFile = () => {
    if (fileRef.current.files.length > 0) {
      let file = fileRef.current.files[0];
      setFileName(file.name);
    }
  };

  const handleMonthChange = () => {
    let dates = 0;
    if (monthRef.current.value) {
      dates = calendar[monthRef.current.value];
    }

    let newDates = [];
    for (let i = 1; i <= dates; i++) {
      newDates.push(
        <option value={i} key={i - 1}>
          {i}
        </option>
      );
    }
    setNewDates(newDates);
  };

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  return (
    <>
      <Button onClick={openModal} variant="primary">
        Add New Birthday
      </Button>
      <Modal show={modal} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required ref={nameRef} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <div className="d-flex w-100">
                <Form.Control
                  as="select"
                  defaultValue="Month..."
                  className="mr-2"
                  ref={monthRef}
                  onChange={handleMonthChange}
                >
                  <option value="">Month...</option>
                  {months.map((month, index) => (
                    <option value={month} key={index}>
                      {month}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control
                  as="select"
                  defaultValue="Date..."
                  className="ml-2"
                  ref={dateRef}
                >
                  <option value="">Date...</option>
                  {newDates}
                </Form.Control>
              </div>
            </Form.Group>

            <Form.Group className="custom-file mb-2">
              <Form.Control
                type="file"
                required
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
    </>
  );
};

export default AddRecord;
