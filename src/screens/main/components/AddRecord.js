import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import ModalForm from "./ModalForm";

import { useAuth } from "../../../context/AuthContext";

import { storage, db } from "../../../firebase";

const AddRecord = ({ setError }) => {
  const [modal, setModal] = useState(false);
  const [fileName, setFileName] = useState("Add Person's Picture");
  const nameRef = useRef();
  const dateRef = useRef();
  const fileRef = useRef();

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
    const date = new Date(dateRef.current.value);

    console.log(typeof date);

    const uploadFile = storage
      .ref(`/files/${currentUser.uid}/${fileName}`)
      .put(file);

    uploadFile.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setError(
          "There's something wrong with the upload, Please try again later"
        );
      },
      () => {
        uploadFile.snapshot.ref.getDownloadURL().then((url) => {
          db.birthdays.add({
            userId: currentUser.uid,
            personName: name,
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            fileName: fileName,
            picture: url,
            date_created: db.getCurrentTimestamp(),
          });
        });
      }
    );
    setFileName("Add Person's Picture");
    closeModal();
  };

  const handleFile = () => {
    if (fileRef.current.files.length > 0) {
      let file = fileRef.current.files[0];
      setFileName(file.name);
    }
  };

  return (
    <>
      <Button onClick={openModal} variant="primary">
        Add New Birthday
      </Button>
      <ModalForm
        handleSubmit={handleSubmit}
        handleFile={handleFile}
        modal={modal}
        closeModal={closeModal}
        nameRef={nameRef}
        dateRef={dateRef}
        fileRef={fileRef}
        fileName={fileName}
      />
    </>
  );
};

export default AddRecord;
