import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./modalError.css";

const ModalError = ({ showError, closeModal, errorMessage }) => {
  return (
    <div className={`${showError ? "modalError showModal " : "modalError"}`}>
      <div className="modalErrorContainer">
        <div className="modalErrorHeader">
          <h5 style={{ color: "red" }}>Error</h5>
          <AiOutlineClose
            style={{ cursor: "pointer", fontSize: "120%" }}
            onClick={() => closeModal()}
          ></AiOutlineClose>
        </div>
        <br />
        <h5> {errorMessage}</h5>

        <button className="okButton" onClick={() => closeModal()}>
          OK!
        </button>
      </div>
    </div>
  );
};

export default ModalError;
