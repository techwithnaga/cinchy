import React from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import Otp from "../../components/otp/Otp";
import "./confirmation.css";

const Confirmation = () => {
  return (
    <div className="confirmation">
      <Navbar2></Navbar2>
      <div className="confirmationContainer">
        <Otp></Otp>
      </div>
    </div>
  );
};

export default Confirmation;
