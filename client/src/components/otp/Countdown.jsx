import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Countdown = (phonenumber) => {
  const [timer, setTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const handleResendCode = () => {
    setCanResend(false);
    setTimer(10);
    navigate("/otpConfirmation", { state: phonenumber });
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
