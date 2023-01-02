import React, { useContext, useState } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import ProgressBar from "../../components/progressBar/ProgressBar";
import "./information.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ModalError from "../../components/modalError/ModalError";

const Information = () => {
  const isLoggedIn = sessionStorage.getItem("token");
  const { state } = useLocation();
  const {
    motorGroupId,
    days,
    deliveryDateInMillisecond,
    returnDateInMillisecond,
  } = useContext(SearchContext);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    whatsappNumber: state.phoneNumber,
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactCountryCode: "",
    gender: 1,
  });

  const [booking, setBooking] = useState({
    motorGroup: motorGroupId,
    deliveryDate: deliveryDateInMillisecond,
    returnDate: returnDateInMillisecond,
    user: "",
    comments: "",
    flightNumber: "",
    hotelName: "",
    deliveryLocation: "",
    deliveryURL: "",
    returnLocation: "",
    returnURL: "",
  });

  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const closeModalError = () => {
    setShowError(false);
  };

  const handleContinueConfirmationClick = async () => {
    //check if the user has filled all required field
    if (
      user.firstName === "" ||
      booking.deliveryLocation === "" ||
      booking.returnLocation === ""
    ) {
      //throw modal error
      setShowError(true);
    }

    let newUser;
    await axios
      .post("http://localhost:8800/api/user", user)
      .then((res) => {
        newUser = res.data;
      })
      .catch((err) => console.log(err));
    booking.user = newUser._id;

    await axios
      .post("http://localhost:8800/api/booking", booking)
      .then((res) => {
        navigate("/bookingSummary", { state: { newBooking: res.data } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/deliveryFee",
    "get"
  );

  // const { data, loading, error, reFetch } = useFetch(
  //   `http://localhost:8800/api/motorGroup/${motorGroupId}`,
  //   "get"
  // );

  // const { data, loading, error, reFetch } = useFetch(
  //   `http://localhost:8800/api/motorGroup/${motorGroupId}`,
  //   "get"
  // );

  // Promise.all([useFetch(
  //   "http://localhost:8800/api/deliveryFee",
  //   "get"
  // ), useFetch(
  //   `http://localhost:8800/api/motorGroup/${motorGroupId}`,
  //   "get")]).then(([]) =>)

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleBookingChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="information">
      <Navbar2></Navbar2>
      <br />
      <ProgressBar step={2}></ProgressBar>
      <div className="selectedMotorInfo">
        <img src="" alt="" />
        <div className="selectedMotorInfoDates"></div>

        <h6>CHANGE</h6>
      </div>

      <div className="informationContainer">
        <div className="driverInfo">
          <h5>Driver Info</h5>
          <h6>
            First Name<span style={{ color: "red" }}>*</span>
          </h6>
          <input
            type="text"
            placeholder="First name"
            id="firstName"
            onChange={handleChange}
          />
          <h6>Last Name</h6>
          <input
            type="text"
            placeholder="Last name"
            id="lastName"
            onChange={handleChange}
          />
          <h6>Email</h6>
          <input
            type="text"
            placeholder="youremail@email.com"
            id="emailAddress"
          />
          <div className="emergency">
            <h6>Emergency Contact Name</h6>
            <input
              type="text"
              placeholder="Name"
              id="emergencyContactName"
              onChange={handleChange}
            />

            <h6>Emergency Contact Number</h6>
            <input
              type="text"
              placeholder="Phone number"
              id="emergencyContactNumber"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="otherInfo">
          <h5>Other Info</h5>
          <h6>
            Delivery Area<span style={{ color: "red" }}>*</span>
          </h6>
          <select
            name="deliveryLocation"
            id="deliveryLocation"
            onChange={handleBookingChange}
            defaultValue=""
          >
            <option disabled value="">
              Which area do you want us to deliver the unit?
            </option>
            {data.map((df) => {
              return (
                <option key={df._id} value={df._id} className="option">
                  {df.region} - {df.fee === 0 ? "Free" : `Rp ${df.fee}K`}
                  {/* <div className="optionRegion"></div>
                  <div className="optionDash">  </div>
                  <div className="optionFee">
                  </div> */}
                </option>
              );
            })}
          </select>
          {/* <h6>
            Pick Up/Delivery Location<span style={{ color: "red" }}>*</span>
          </h6>
          <input type="text" placeholder="Please enter your hotel/landmark" /> */}
          <h6>Delivery Map Link</h6>
          <input
            type="text"
            placeholder="Please paste google map URL"
            id="deliveryURL"
            onChange={handleBookingChange}
          />
          <h6>Arrival Flight Number </h6>
          <input
            type="text"
            placeholder="Flight number"
            id="flightNumber"
            onChange={handleBookingChange}
          />
          {/* <div className="flight">
            <div className="arrivalDate">
              <h6>Arrival Flight Date</h6>
              <input
                type="text"
                placeholder="25 Dec 2022"
                onChange={handleChange}
              />
            </div>
            <div className="arrivalTime">
              <h6>Arrival Flight Time</h6>
              <input
                type="text"
                placeholder="09:00 AM"
                onChange={handleChange}
              />
            </div>
          </div> */}
        </div>

        <div className="pickUp">
          <h6>
            Return Area <span style={{ color: "red" }}>*</span>
          </h6>
          {/* <input type="text" placeholder="Kuta (FREE)" /> */}
          <select
            name="returnLocation"
            id="returnLocation"
            defaultValue=""
            onChange={handleBookingChange}
          >
            <option disabled value="">
              Which area do you want to return the unit?
            </option>
            {data.map((df) => {
              return (
                <option key={df._id} value={df._id}>
                  {df.region} - {df.fee === 0 ? "Free" : `Rp ${df.fee}K`}
                </option>
              );
            })}
          </select>

          {/* <h6>
            Pick Up Location <span style={{ color: "red" }}>*</span>
          </h6>
          <input type="text" placeholder="Please enter your hotel/landmark" /> */}

          <h6>Return Map Link</h6>
          <input
            type="text"
            placeholder="Please paste google map URL"
            id="returnURL"
            onChange={handleBookingChange}
          />
        </div>

        <div className="commentSection">
          <h6>Additional Notes/ Request</h6>
          <input
            type="text"
            placeholder="Please enter additional comments"
            id="comments"
            onChange={handleBookingChange}
          />
        </div>

        {/* <div className="informationPaymentSummary">
          <h5>Payment Summary</h5>
          <div className="infoTotal">
            <h5 style={{ color: "#90A3BF" }}>Total</h5>
            <h3 style={{ color: "#00332C" }}>IDR {data.price * days}K</h3>
          </div>
        </div> */}

        <button
          className="informationContinueBtn"
          onClick={() => handleContinueConfirmationClick()}
        >
          Continue to confirmation
        </button>
      </div>

      {showError && (
        <ModalError
          showError={showError}
          closeModal={closeModalError}
          errorMessage="Please fill out all required field."
        ></ModalError>
      )}
    </div>
  );
};

export default Information;
