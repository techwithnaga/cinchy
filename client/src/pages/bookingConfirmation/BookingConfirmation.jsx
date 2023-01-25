import React from "react";
import "./bookingConfirmation.css";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Navbar2 from "../../components/navbar2/Navbar2";
import images from "../../pictures/picture";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const BookingConfirmation = () => {
  const { state } = useLocation();

  const bookingInfo = state.bookingInfo;
  const motorGroup = state.motorGroup;
  const deliveryDate = state.deliveryDate;
  const returnDate = state.returnDate;

  const navigate = useNavigate();

  const handleMyBookingClick = () => {
    navigate("/mybooking");
  };

  return (
    <div className="BookingConfirmation">
      <Navbar2></Navbar2>
      <div className="BookingConfirmationContainer">
        <IoCheckmarkCircleSharp className="BookingConfirmationCheckMark"></IoCheckmarkCircleSharp>
        <h5 className="BookingConfirmedText">Booking Confirmed</h5>

        <div className="bookingConfirmationMid">
          <div className="bookingConfirmationMidHeader">
            <h5>Booking #{bookingInfo._id.slice(-5)}</h5>
            <p>
              {format(new Date(deliveryDate), "E, d MMM HH:mm")} -
              {format(new Date(returnDate), "E, d MMM HH:mm")}
            </p>
          </div>
          <div className="bookingConfirmationMidBody">
            <img src={motorGroup.photos} alt="" />
            <div className="bookingConfirmationMidBodyText">
              <label htmlFor="Style" style={{ color: "red" }}>
                {motorGroup.category}
              </label>
              <h6>{motorGroup.groupName}</h6>
            </div>
          </div>
        </div>
        <div className="bookingConfirmationBottom">
          <p>
            We have booked your motor for the selected date. Our staff will send
            you a reminder 24 hours before the date to your WhatsApp.
          </p>
          <br />
          <p>
            Check<span style={{ fontWeight: "bold" }}> My Booking </span>menu
            for the booking detail or to make a cancellation.
          </p>
        </div>
        <br />
        <button
          className="myBookingLink"
          onClick={() => handleMyBookingClick()}
        >
          My Booking
        </button>
        <br />
        <br />
        <p>
          *Please note that we only accept{" "}
          <span style={{ fontWeight: "bold" }}>Local Currency (IDR)</span> via
          <span style={{ fontWeight: "bold" }}> Cash</span> <span> or</span>
          <span style={{ fontWeight: "bold" }}>Bank Transfer. </span>
        </p>
        <p> (Online payment coming soon)</p>
      </div>
    </div>
  );
};

export default BookingConfirmation;
