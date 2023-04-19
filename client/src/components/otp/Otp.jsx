import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Countdown from "./Countdown";
import "./otp.css";
import axios from "axios";
import { AutoTabProvider } from "react-auto-tab";
import { AuthContext } from "../../context/AuthContext";

const Otp = () => {
  const { state } = useLocation();
  // const [timer, setTimer] = useState(60);
  const { data, reFetch } = useFetch(
    `${process.env.REACT_APP_API_ENDPOINT}/api/otp/${state.phoneNumber}`,
    "get"
  );

  const navigate = useNavigate();
  const [wrongOTP, setWrongOTP] = useState(false);
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleVerify = async () => {
    let num1 = document.querySelector("#digitInput1").value;
    let num2 = document.querySelector("#digitInput2").value;
    let num3 = document.querySelector("#digitInput3").value;
    let num4 = document.querySelector("#digitInput4").value;
    let num5 = document.querySelector("#digitInput5").value;
    let num6 = document.querySelector("#digitInput6").value;
    const verificationCode = num1 + num2 + num3 + num4 + num5 + num6;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/otp/verifyOTP`,
        {
          phoneNumber: state.phoneNumber,
          otp: verificationCode,
          hash: data,
        }
      );

      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        if (state.fromPage === "mybooking") {
          navigate("/mybooking");
        } else {
          navigate("/information");
        }
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: "Invalid OTP" });
      }
    } catch (err) {
      // dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(err);
    }
    // await axios
    //   .post(`${process.env.REACT_APP_API_ENDPOINT}/api/otp/verifyOTP`, {
    //     phoneNumber: state.phoneNumber,
    //     otp: verificationCode,
    //     hash: data,
    //   })
    //   .then((res) => {
    //     //save token
    //     dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    //     if (state.fromPage === "mybooking") {
    //       navigate("/mybooking");
    //     } else {
    //       navigate("/information");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    //     setWrongOTP(true);
    //   });
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
  //   // const interval = setInterval(() => {
  //   //   tick();
  //   // }, 1000);

  //   // return () => {
  //   //   clearInterval(interval);
  //   // };
  // });

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
                id="digitInput1"
              />
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                id="digitInput2"
              />
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                id="digitInput3"
              />
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                id="digitInput4"
              />
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                id="digitInput5"
              />
              <input
                type="text"
                maxLength={1}
                tabbable="true"
                className="digitInput"
                id="digitInput6"
              />
            </AutoTabProvider>
          </div>
          <br />

          <Countdown
            phonenumber={state.phoneNumber}
            // setHash={setHash}
            reFetch={reFetch}
            setWrongOTP={setWrongOTP}
          ></Countdown>
          <button className="otpVerifyBtn" onClick={handleVerify}>
            Verify
          </button>
          <br />
          {wrongOTP && (
            <div className="errorMessage">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Otp;
