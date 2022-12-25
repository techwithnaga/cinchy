import React from "react";
import "./bookingConfirmation.css";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Navbar2 from "../../components/navbar2/Navbar2";

const bookingConfirmation = () => {
  return (
    <div className="BookingConfirmation">
      <Navbar2></Navbar2>
      <div className="BookingConfirmationContainer">
        <IoCheckmarkCircleSharp></IoCheckmarkCircleSharp>
      </div>
    </div>
  );
};

export default bookingConfirmation;
