import React from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import ProgressBar from "../../components/progressBar/ProgressBar";
import BikeOption from "../../components/bikeOption/BikeOption";
import "./bookingConfirmation.css";
import images from "../../pictures/picture";

const BookingConfirmation = () => {
  return (
    <div className="bookingConfirmation">
      <Navbar2></Navbar2>
      <br />
      <ProgressBar step={3}></ProgressBar>
      <div className="bookingConfirmationContainer">
        <h3>Booking Summary</h3>
        <div className="bookingConfirmationContent">
          <BikeOption></BikeOption>
          <div className="bookingConfirmationPolicy">
            <div className="policyRequirement">
              <h3>Rental Policy</h3>
              <ul className="rentalPolicyList">
                <li>Return the fuel as received</li>
                <li>Usage of up to 24 hours per rental day</li>
              </ul>
              <br />
              <h3>Rental Requirement</h3>
              <ul className="rentalPolicyList">
                <li>ID Card (KTP or passport)</li>
                <li>Others (if provider requires additional verification)</li>
                <li>Driver’s license (SIM C)/ International Driving Permit</li>
                <li>Deposit of IDR 500.000</li>
              </ul>
            </div>
            <button className="learnMoreBtn">Learn More</button>
          </div>
        </div>
        <h3>Confirmation</h3>
        <div className="bookingConfirmationFooter">
          <p style={{ color: "#90A3BF" }}>
            We are getting to the end. Just few clicks and your rental is ready!
          </p>
          <br />
          <div className="BookingConfirmationCheckBoxes">
            <div className="BookingConfirmationCheckBox">
              <input type="checkbox" />
              <label>
                I agree with sending an Marketing and newsletter emails. No
                spam, promissed!
              </label>
            </div>
            <div className="BookingConfirmationCheckBox">
              <input type="checkbox" />
              <label>
                I agree with sending an Marketing and newsletter emails. No
                spam, promissed!
              </label>
            </div>
          </div>
        </div>
        <button className="bookingConfirmationConfirmBtn">Confirm</button>
        <div className="dataSecurity">
          <img src={images.secureIcon} alt="" />
          <h3>All your data are safe</h3>
          <p style={{ color: "#90A3BF" }}>
            We are using the most advanced security to provide you the best
            experience ever.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
