import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Countdown from "./Countdown";
import "./otp.css";
import axios from "axios";

const Otp = () => {
  const { state } = useLocation();

  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/otp/getOTP",
    "post",
    {
      phoneNumber: state,
    }
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
  const { wrongOTP, setWrongOTP } = useState(true);

  const handleVerify = async () => {
    navigate("/information");
    const verificationCode =
      digit1 + digit2 + digit3 + digit4 + digit5 + digit6;

    try {
      const res = await axios.post("http://localhost:8800/api/otp/verifyOTP", {
        phoneNumber: state,
        otp: verificationCode,
        hash: hash,
      });
      console.log(res);
      if (res.status === 200) {
        //go to next page
        navigate("/information");
      } else {
        setWrongOTP(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const tick = () => {
  //   if (timer <= 0) {
  //     setCanResend(true);
  //   } else {
  //     setTimer(timer - 1);
  //   }
  // };

  // const handleResendCode = () => {
  //   setCanResend(false);
  //   setTimer(60);
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     tick();
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // });

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
          {/* {canResend ? (
            <button className="otpResendBtn" onClick={() => handleResendCode()}>
              Resend Code
            </button>
          ) : (
            <button htmlFor="resendCode" className="otpResendBtn" disabled>
              Resend code in {timer}s
            </button>
          )} */}
          <Countdown phonenumber={state}></Countdown>
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
