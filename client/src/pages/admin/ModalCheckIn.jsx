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
          <h5 style={{ color: "green" }}>Kirim</h5>
          <AiOutlineClose
            style={{ cursor: "pointer", fontSize: "120%" }}
            onClick={() => closeModal()}
          ></AiOutlineClose>
        </div>
        <br />

        <div className="modalCheckInOutBody">
          <div className="modalCheckInOutBodyItem">
            <h6>Booking ID : </h6>
            <p>{data.bookingId}</p>
          </div>

          <div className="modalCheckInOutBodyItem">
            <h6>Customer Name : </h6>
            <p>{data.customerName}</p>
          </div>

          {/* <div className="modalCheckInOutBodyItem">
            <h6>Check Out Time : </h6>
            <p>{data.checkOutTime}</p>
          </div>
          <div className="modalCheckInOutBodyItem">
            <h6>Nomor Plat Motor : </h6>
          </div> */}
          <br />

          <h6>KM Sekarang : </h6>
          <input type="number" />
          <br />
          <h6>Motor : </h6>
        </div>
        <button className="okButton" onClick={() => closeModal()}>
          Check In
        </button>
      </div>
    </div>
  );
};

export default ModalCheckIn;
