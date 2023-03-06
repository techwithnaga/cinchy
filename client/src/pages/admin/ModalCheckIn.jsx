import React, { useState } from "react";
import "./modalCheckInOut.css";
import { AiOutlineClose } from "react-icons/ai";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const ModalCheckIn = ({
  showModal,
  closeModal,
  bookingId,
  customerName,
  selectedMotor,
  handleMotorSelected,
  availableMotors,
}) => {
  // const { data, loading, error, reFetch } = useFetch(
  //   `${process.env.REACT_APP_API_ENDPOINT}/api/motor/getAllAvailableMotors`,
  //   "get"
  // );

  const handleCheckIn = () => {};

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
            <p> {bookingId}</p>
          </div>

          <div className="modalCheckInOutBodyItem">
            <h6>Customer Name : </h6>
            <p> {customerName}</p>
          </div>

          {/* <div className="modalCheckInOutBodyItem">
            <h6>Check Out Time : </h6>
            <p>{data.checkOutTime}</p>
          </div>
          <div className="modalCheckInOutBodyItem">
            <h6>Nomor Plat Motor : </h6>
          </div> */}
          <br />

          <TextField
            id="outlined-basic"
            type="number"
            label="Check-in KM "
            variant="outlined"
          />
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
              {availableMotors.map((motor, index) => {
                return (
                  <MenuItem
                    defaultValue=""
                    value={motor.licensePlate}
                    key={index}
                  >
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
