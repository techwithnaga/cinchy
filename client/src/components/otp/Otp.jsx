import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./otp.css";

const Otp = () => {
  const { state } = useLocation();
  const [digit1, setDigit1] = useState();
  const [digit2, setDigit2] = useState();
  const [digit3, setDigit3] = useState();
  const [digit4, setDigit4] = useState();
  const [digit5, setDigit5] = useState();
  const [digit6, setDigit6] = useState();

  const [timer, setTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);

  const handleVerify = () => {
    const verificationCode =
      digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
    console.log(verificationCode);
  };

  const tick = () => {
    if (timer <= 0) {
      setCanResend(true);
    } else {
      setTimer(timer - 1);
    }
  };

  const handleResendCode = () => {
    setCanResend(false);
    setTimer(120);
  };

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
          <label> A verification code has been sent to</label>
          <p>+{state}</p>
          <div className="confirmationCode">
            <input
              type="text"
              maxLength="1"
              className="digitInput"
              onChange={(e) => setDigit1(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              className="digitInput"
              onChange={(e) => setDigit2(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              className="digitInput"
              onChange={(e) => setDigit3(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              className="digitInput"
              onChange={(e) => setDigit4(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              className="digitInput"
              onChange={(e) => setDigit5(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              className="digitInput"
              onChange={(e) => setDigit6(e.target.value)}
            />
          </div>
          <br />
          {canResend ? (
            <button className="otpResendBtn" onClick={() => handleResendCode()}>
              Resend Code
            </button>
          ) : (
            <button htmlFor="resendCode" className="otpResendBtn" disabled>
              Resend code in {timer}s
            </button>
          )}
          <button className="otpVerifyBtn" onClick={() => handleVerify()}>
            Verify
          </button>
        </div>
      </div>
    </>
  );
};

export default Otp;
