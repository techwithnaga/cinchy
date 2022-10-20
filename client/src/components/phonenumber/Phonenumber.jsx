import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import "./phonenumber.css";

const Phonenumber = () => {
  const [phonenumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/otpConfirmation", { state: phonenumber });
  };

  return (
    <div className="phoneNumber">
      <div className="phoneNumberContainer">
        <h5>Log in</h5>
        <p>
          Logging in with an unregistered phone number creates a new Cinchy
          account.
        </p>
        <h5>Whatsapp Phone Number</h5>
        <PhoneInput
          country={"us"}
          value={phonenumber}
          onChange={(phonenumber) => setPhoneNumber(phonenumber)}
        />
        <button
          className="phoneNumberLoginBtn"
          onClick={() => handleLoginClick()}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Phonenumber;
