import React from "react";
import "./modalCheckInOut.css";
import { AiOutlineClose } from "react-icons/ai";

const ModalCheckOut = ({ showModal, closeModal, data }) => {
  return (
    <div
      className={`${
        showModal ? "modalCheckInOut showModal " : "modalCheckInOut"
      }`}
    >
      <div className="modalCheckInOutContainer">
        <div className="modalCheckInOutHeader">
          <h5 style={{ color: "red" }}>Kembali</h5>
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

          <div className="modalCheckInOutBodyItem">
            <h6>Check Out Time : </h6>
            <p>{data.checkOutTime}</p>
          </div>
          <div className="modalCheckInOutBodyItem">
            <h6>Nomor Plat Motor : </h6>
          </div>
          <br />
          <h6>KM Terakhir : </h6>
          <input type="number" />
          <br />
          <h6>Note : </h6>
          <textarea
            name="comments"
            id="comments"
            rows="5"
            placeholder="Tulis disini kalau ada kerusakan di motor dan komentar"
          ></textarea>
        </div>

        <button className="okButton" onClick={() => closeModal()}>
          Check Out
        </button>
      </div>
    </div>
  );
};

export default ModalCheckOut;
