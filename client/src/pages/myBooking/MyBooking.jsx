import React from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import BookingDetail from "./BookingDetail";
import "./myBooking.css";

const MyBooking = () => {
  return (
    <div className="myBooking">
      <Navbar2></Navbar2>
      <div className="myBookingContainer">
        <h5 style={{ textAlign: "left" }}>My Booking</h5>
        <br />
        <h6>Recent Booking</h6>
        <BookingDetail></BookingDetail>
        <br />
        <h6>Previous Booking</h6>
        <BookingDetail></BookingDetail>
        <br />
        <h6>Cancelled Booking</h6>
        <BookingDetail></BookingDetail>
      </div>
    </div>
  );
};

export default MyBooking;
