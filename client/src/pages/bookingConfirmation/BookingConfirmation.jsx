import React from "react";
import "./bookingConfirmation.css";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Navbar2 from "../../components/navbar2/Navbar2";
import images from "../../pictures/picture";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BookingConfirmation = () => {
  const location = useLocation();

  const bookingInfo = location.state;
  console.log(bookingInfo._id);
  return (
    <div className="BookingConfirmation">
      <Navbar2></Navbar2>
      <div className="BookingConfirmationContainer">
        <IoCheckmarkCircleSharp className="BookingConfirmationCheckMark"></IoCheckmarkCircleSharp>
        <h5 className="BookingConfirmedText">Booking Confirmed</h5>

        <div className="bookingConfirmationMid">
          <div className="bookingConfirmationMidHeader">
            <h5>Booking #12345</h5>
            <p>Sun, 25 Dec 09:00 - Wed, 28 Dec 09:00</p>
          </div>
          <div className="bookingConfirmationMidBody">
            <img src={images.vespaPrimavera} alt="" />
            <div className="bookingConfirmationMidBodyText">
              <h6>Vespa Primavera</h6>
              <label htmlFor="Style" style={{ color: "red" }}>
                Style
              </label>
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
            for the booking detail or to make a cancelation.
          </p>
        </div>

        <Link to={"/mybooking"}>
          <div className="myBookingLink">My Booking</div>
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
