import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import ModalError from "../modalError/ModalError";
import "./phonenumber.css";

const Phonenumber = () => {
  const [phonenumber, setPhoneNumber] = useState("");
  const [error, setShowError] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLoginClick = () => {
    if (phonenumber.length < 8) {
      setShowError(true);
    } else {
      navigate("/otpConfirmation", {
        state: { phoneNumber: phonenumber, fromPage: state.fromPage },
      });
    }
  };

  const closeModal = () => {
    setShowError(false);
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
          country={"id"}
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

      {error && (
        <ModalError
          closeModal={closeModal}
          showError={error}
          errorMessage="Please enter a valid phonenumber"
        ></ModalError>
      )}
    </div>
  );
};

export default Phonenumber;
