import React, { useState } from "react";
import images from "../../pictures/picture";
import useFetch from "../../hooks/useFetch";
import formatNumber from "../../utils/formatNumber";
import { Link } from "react-router-dom";
import ModalConfirmation from "../../modalConfirmation/ModalConfirmation";
import { format } from "date-fns";

const BookingDetail = ({
  bookingId,
  fullBookingId,
  deliveryDate,
  returnDate,
  motorGroupId,
  groupName,
  photos,
  category,
  totalRentalPrice,
  deliveryArea,
  deliveryURL,
  returnArea,
  returnURL,
  isPaid,
  cancelBooking,
  showModal,
  closeModal,
  setShowModal,
}) => {
  // const absoulteUrl = new URL(baseOfAnotherHost).href;

  return (
    <div className="bookingDetail">
      <div className="bookingDetailTop">
        <h6>Booking #{bookingId}</h6>
        <label>
          {format(new Date(deliveryDate), "E, d MMM HH:mm")} -
          {format(new Date(returnDate), "E, d MMM HH:mm")}
          {/*  -
          {format(new Date(1673362800000), "E, d MMM HH:mm")} */}
        </label>
      </div>
      <div className="bookingDetailMid">
        <img src={photos[0]} alt="" />
        <div className="bookingDetailMidDescription">
          <h6>{groupName} or similar</h6>
          <label style={{ color: "red" }}>{category}</label>
          <h6>IDR {formatNumber(totalRentalPrice)}K</h6>
          <button className="cancelBtn" onClick={() => setShowModal(true)}>
            Cancel
          </button>
        </div>
      </div>

      <div className="bookingDetailBottom">
        <h6>Delivery Area:</h6>
        <p>{deliveryArea}</p>
        <br />
        <h6>Delivery - Google Map Link</h6>
        {deliveryURL === "" ? (
          <p>Not Provided</p>
        ) : (
          <p>
            <a href={`https://${deliveryURL}`} target={"_blank"} rel="noopener">
              {deliveryURL}
            </a>
          </p>
        )}
        <br />
        <h6>Return Area:</h6>
        <p>{returnArea}</p>
        <br />
        <h6>Return - Google Map Link</h6>
        {returnURL === "" ? (
          <p>Not Provided</p>
        ) : (
          <p>
            <a href={`https://${returnURL}`} target="_blank" rel="noopener">
              {returnURL}
            </a>
          </p>
        )}
        <br />
        <h6>Booking Paid Status:</h6>
        {isPaid ? <p>Paid(Y)</p> : <p>Not paid yet(N)</p>}
        <br />
        {/* <h6>Vehicle Delivered Status:</h6>
        <p>Delivered/ Not Delivered</p>
        <br />
        <h6>Vehicle Returned Status:</h6>
        <p>Returned/ Not Returned</p> */}
      </div>
      <ModalConfirmation
        showModal={showModal}
        closeModal={closeModal}
        cancelBooking={cancelBooking}
        motorGroupId={motorGroupId}
        fullBookingId={fullBookingId}
        message="Are you sure you want to cancel this booking? This action cannot be undone."
      ></ModalConfirmation>
    </div>
  );
};

export default BookingDetail;
