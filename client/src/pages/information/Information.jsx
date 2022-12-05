import React, { useContext } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import ProgressBar from "../../components/progressBar/ProgressBar";
import "./information.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";

const Information = () => {
  const isLoggedIn = sessionStorage.getItem("token");
  // if (isLoggedIn == null) {
  //   return <Navigate to={{ pathname: "/login" }}></Navigate>;
  // }
  const navigate = useNavigate();
  const handleContinueConfirmationClick = () => {
    navigate("/bookingconfirmation");
  };

  const { motorGroupId, days } = useContext(SearchContext);
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/motorGroup/${motorGroupId}`,
    "get"
  );

  return (
    <div className="information">
      <Navbar2></Navbar2>
      <br />
      <ProgressBar step={2}></ProgressBar>
      <div className="informationContainer">
        <div className="driverInfo">
          <h5>Driver Info</h5>
          <h6>
            Title<span style={{ color: "red" }}>*</span>
          </h6>
          <input type="text" placeholder="Mr" />
          <h6>
            First Name<span style={{ color: "red" }}>*</span>
          </h6>
          <input type="text" placeholder="First name" />
          <h6>Last Name</h6>
          <input type="text" placeholder="Last name" />
          <h6>Email</h6>
          <input type="text" placeholder="youremail@email.com" />
        </div>

        <div className="otherInfo">
          <h5>Other Info</h5>
          <h6>
            Drop Off/Delivery Area<span style={{ color: "red" }}>*</span>
          </h6>
          <input type="text" placeholder="Kuta (FREE)" />
          <h6>
            Drop Off/Delivery Location<span style={{ color: "red" }}>*</span>
          </h6>
          <input type="text" placeholder="Please enter your hotel/landmark" />
          <h6>Drop Off/ Google Map link</h6>
          <input type="text" placeholder="Please paste google map URL" />
          <h6>Arrival Flight Number (optional)</h6>
          <input type="text" placeholder="Flight number" />
          <div className="flight">
            <div className="arrivalDate">
              <h6>Arrival Flight Date</h6>
              <input type="text" placeholder="25 Dec 2022" />
            </div>
            <div className="arrivalTime">
              <h6>Arrival Flight Time</h6>
              <input type="text" placeholder="09:00 AM" />
            </div>
          </div>
        </div>

        <div className="pickUp">
          <h6>
            Pick Up Area <span style={{ color: "red" }}>*</span>
          </h6>
          <input type="text" placeholder="Kuta (FREE)" />

          <h6>
            Pick Up Location <span style={{ color: "red" }}>*</span>
          </h6>
          <input type="text" placeholder="Please enter your hotel/landmark" />

          <h6>
            Pick Up URL <span style={{ color: "red" }}>*</span>
          </h6>
          <input type="text" placeholder="Please paste google map URL" />
        </div>

        <div className="emergency">
          <h6>Emergency Contact Name</h6>
          <input type="text" placeholder="Name" />

          <h6>Emergency Contact Number</h6>
          <input type="text" placeholder="Phone number" />
        </div>

        <div className="informationPaymentSummary">
          <h5>Payment Summary</h5>
          <div className="infoTotal">
            <h5 style={{ color: "#90A3BF" }}>Total</h5>
            <h3 style={{ color: "#00332C" }}>IDR {data.price * days}K</h3>
          </div>
        </div>

        <button
          className="informationContinueBtn"
          onClick={() => handleContinueConfirmationClick()}
        >
          Continue to confirmation
        </button>
      </div>
    </div>
  );
};

export default Information;
