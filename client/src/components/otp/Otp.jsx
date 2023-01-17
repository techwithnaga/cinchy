import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Countdown from "./Countdown";
import "./otp.css";
import axios from "axios";
import { AutoTabProvider } from "react-auto-tab";

const Otp = () => {
  const { state } = useLocation();
  const [timer, setTimer] = useState(60);
  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_API_ENDPOINT}/api/otp/${state.phoneNumber}`,
    "get"
  );

  const hash = data;

  const [digit1, setDigit1] = useState();
  const [digit2, setDigit2] = useState();
  const [digit3, setDigit3] = useState();
  const [digit4, setDigit4] = useState();
  const [digit5, setDigit5] = useState();
  const [digit6, setDigit6] = useState();

  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const [wrongOTP, setWrongOTP] = useState(false);

  const handleVerify = async () => {
    // //go to next page
    // navigate("/information", { state: { phoneNumber: state.phoneNumber } });

    const verificationCode =
      digit1 + digit2 + digit3 + digit4 + digit5 + digit6;

    await axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/otp/verifyOTP`, {
        phoneNumber: state.phoneNumber,
        otp: verificationCode,
        hash: hash,
      })
      .then((res) => {
        //save token
        sessionStorage.setItem("token", res.data.token);
        if (state.fromPage === "mybooking") {
          navigate("/mybooking");
        } else {
          navigate("/information", {
            state: { phoneNumber: state.phoneNumber },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setWrongOTP(true);
      });
  };

  const tick = () => {
    if (timer <= 0) {
      setCanResend(true);
    } else {
      setTimer(timer - 1);
    }
  };

  // const handleResendCode = () => {
  //   setCanResend(false);
  //   setTimer(60);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <div className="otp">
        <div className="otpContainer">
          <h5>Enter code</h5>
          <p> A verification code has been sent to your Whatsapp</p>
          <p>+{state.phoneNumber}</p>
          <div className="confirmationCode">
            <AutoTabProvider>
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                onChange={(e) => setDigit1(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                onChange={(e) => setDigit2(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                onChange={(e) => setDigit3(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                onChange={(e) => setDigit4(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                onChange={(e) => setDigit5(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                onChange={(e) => setDigit6(e.target.value)}
              />
            </AutoTabProvider>
          </div>
          <br />

          <Countdown phonenumber={state} reFetch={reFetch}></Countdown>
          <button className="otpVerifyBtn" onClick={() => handleVerify()}>
            Verify
          </button>
          <br />
          {wrongOTP && (
            <div className="errorMessage">
              <p>You entered a wrong OTP. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Otp;
