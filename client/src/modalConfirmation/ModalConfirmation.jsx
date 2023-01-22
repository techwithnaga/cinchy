import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./modalConfirmation.css";

const ModalConfirmation = ({
  showModal,
  closeModal,
  message,
  cancelBooking,
  motorGroupId,
  fullBookingId,
}) => {
  return (
    <div
      className={`${
        showModal ? "modalConfirmation showModal " : "modalConfirmation"
      }`}
    >
      <div className="modalConfirmationContainer">
        <div className="modalConfirmationHeader">
          <h5 style={{ color: "red" }}>Cancel Booking</h5>
          <AiOutlineClose
            style={{ cursor: "pointer", fontSize: "120%" }}
            onClick={() => closeModal()}
          ></AiOutlineClose>
        </div>
        <br />
        <h5> {message}</h5>

        <div className="buttonWrapper">
          <button
            className="modalBtn"
            onClick={() => cancelBooking(motorGroupId, fullBookingId)}
          >
            YES
          </button>
          <button className="modalBtn" onClick={() => closeModal()}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
