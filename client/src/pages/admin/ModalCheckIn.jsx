import React from "react";
import "./modalCheckInOut.css";
import { AiOutlineClose } from "react-icons/ai";

const ModalCheckIn = ({ showModal, closeModal, data }) => {
  return (
    <div
      className={`${
        showModal ? "modalCheckInOut showModal " : "modalCheckInOut"
      }`}
    >
      <div className="modalCheckInOutContainer">
        <div className="modalCheckInOutHeader">
          <h5 style={{ color: "red" }}>Error</h5>
          <AiOutlineClose
            style={{ cursor: "pointer", fontSize: "120%" }}
            onClick={() => closeModal()}
          ></AiOutlineClose>
        </div>
        <br />
        <h5>Modal check in</h5>

        <button className="okButton" onClick={() => closeModal()}>
          OK!
        </button>
      </div>
    </div>
  );
};

export default ModalCheckIn;
