import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Countdown = ({ phonenumber, setHash, reFetch }) => {
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  // const navigate = useNavigate();

  const handleResendCode = async () => {
    setCanResend(false);
    setTimer(30);
    reFetch();
  };

  useEffect(() => {
    const tick = () => {
      if (timer <= 0) {
        setCanResend(true);
      } else {
        setTimer(timer - 1);
      }
    };

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      {canResend ? (
        <button className="otpResendBtn" onClick={() => handleResendCode()}>
          Resend Code
        </button>
      ) : (
        <button htmlFor="resendCode" className="otpResendBtn" disabled>
          Resend code in {timer}s
        </button>
      )}
    </>
  );
};

export default Countdown;
