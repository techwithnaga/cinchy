import React, { useEffect, useState, useContext } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import BookingDetail from "./BookingDetail";
import { useNavigate } from "react-router-dom";
import "./myBooking.css";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import { AuthContext } from "../../context/AuthContext";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  // const isLoggedIn = sessionStorage.getItem("token");
  const navigate = useNavigate();
  if (!user) {
    navigate("/login", { state: { fromPage: "mybooking" } });
  }

  let phoneNumber = user?.username;
  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_API_ENDPOINT}/api/user/mycurrentbooking/${phoneNumber}`,
    "get"
  );

  // const [currentBookings, setCurrentBookings] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const cancelBooking = async (motorGroupId, bookingId) => {
    setShowModal(false);
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
        <div className="loaderContainer">
          <FadeLoader
            color="#00332C"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="myBookingContainer">
          <h5 style={{ textAlign: "left" }}>My Booking</h5>
          <br />
          <h6>Recent Booking</h6>
          {data.map((currentBooking) => {
            console.log(currentBooking);
            return (
              <BookingDetail
                {...currentBooking}
                cancelBooking={cancelBooking}
                key={currentBooking.fullBookingId}
                showModal={showModal}
                closeModal={closeModal}
                setShowModal={setShowModal}
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
