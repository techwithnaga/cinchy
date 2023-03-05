import React, { useState } from "react";
import "./modalCheckInOut.css";
import { AiOutlineClose } from "react-icons/ai";
import useFetch from "../../hooks/useFetch";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ModalCheckIn = ({
  showModal,
  closeModal,
  selectedMotor,
  handleMotorSelected,
}) => {
  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_API_ENDPOINT}/api/motor/getAllAvailableMotors`,
    "get"
  );

  console.log(data);

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
          <br />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Motor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedMotor}
              label="Pilih Motor"
              onChange={handleMotorSelected}
            >
              {data.map((motor) => {
                return (
                  <MenuItem value={motor.licensePlate}>
                    {motor.category} {"   -  "} {motor.brand} {motor.name}
                    {"  -  "}
                    {motor.licensePlate}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <button className="okButton" onClick={() => closeModal()}>
          Check In
        </button>
      </div>
    </div>
  );
};

export default ModalCheckIn;
