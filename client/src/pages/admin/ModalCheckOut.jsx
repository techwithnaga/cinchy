import React, { useState } from "react";
import "./modalCheckInOut.css";
import { AiOutlineClose } from "react-icons/ai";
import TextField from "@mui/material/TextField";

const ModalCheckOut = ({
  showModal,
  closeModal,
  bookingId,
  customerName,
  licensePlate,
  checkOutTime,
  handleCheckOut,
}) => {
  const [endingKM, setEndingKM] = useState(0);
  const [note, setNote] = useState("");

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
            <p>{bookingId}</p>
          </div>

          <div className="modalCheckInOutBodyItem">
            <h6>Customer Name : </h6>
            <p>{customerName}</p>
          </div>

          <div className="modalCheckInOutBodyItem">
            <h6>Check Out Time : </h6>
            <p>{checkOutTime}</p>
          </div>
          <div className="modalCheckInOutBodyItem">
            <h6>Nomor Plat Motor : </h6>
            <p>{licensePlate}</p>
          </div>
          <br />
          <br />
          <TextField
            id="outlined-basic"
            type="number"
            label="KM Terakhir"
            variant="outlined"
            value={endingKM}
            onChange={(e) => {
              setEndingKM(e.target.value);
            }}
          />
          <br />
          <br />

          <TextField
            id="outlined-basic"
            type="text"
            label="Note"
            multiline
            minRows={3}
            variant="outlined"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <br />
          <br />
        </div>
        <button
          className="checkincheckout button"
          onClick={() => handleCheckOut(endingKM, note)}
        >
          <p className="buttonTxt">Check Out</p>
        </button>
        {/* {vehicleReturned ? (
          <button
            className="okButton"
            onClick={() => handleCheckOut(endingKM, note)}
            disabled
          >
            Checked-Out
          </button>
        ) : (
          <button
            className="okButton"
            onClick={() => handleCheckOut(endingKM, note)}
          >
            Check Out
          </button>
        )} */}
      </div>
    </div>
  );
};

export default ModalCheckOut;
