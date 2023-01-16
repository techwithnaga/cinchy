import React, { useEffect, useState } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import BookingDetail from "./BookingDetail";
import { useNavigate } from "react-router-dom";
import "./myBooking.css";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const MyBooking = () => {
  const isLoggedIn = sessionStorage.getItem("token");
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate("/login", { state: { fromPage: "mybooking" } });
  }

  let phoneNumber = "62999777";
  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_API_ENDPOINT}/api/user/mycurrentbooking/${phoneNumber}`,
    "get"
  );

  // const [currentBookings, setCurrentBookings] = useState(data);

  const cancelBooking = async (motorGroupId, bookingId) => {
    await axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/api/booking/${motorGroupId}/${bookingId}`
    );
    reFetch();
  };

  // useEffect(() => {}, [currentBookings]);

  return (
    <div className="myBooking">
      <Navbar2></Navbar2>
      {loading ? (
        <h5> Loading...</h5>
      ) : (
        <div className="myBookingContainer">
          <h5 style={{ textAlign: "left" }}>My Booking</h5>
          <br />
          <h6>Recent Booking</h6>
          {data.map((currentBooking) => {
            return (
              <BookingDetail
                {...currentBooking}
                cancelBooking={cancelBooking}
                key={currentBooking.fullBookingId}
              ></BookingDetail>
            );
          })}
          <br />
          {/* <h6>Previous Booking</h6>
          <BookingDetail></BookingDetail>
          <br />
          <h6>Cancelled Booking</h6>
          <BookingDetail></BookingDetail> */}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
