import React from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import Otp from "../../components/otp/Otp";
import "./confirmation.css";

const Confirmation = () => {
  return (
    <div className="confirmation">
      <Navbar2></Navbar2>
      <Otp></Otp>
    </div>
  );
};

export default Confirmation;
