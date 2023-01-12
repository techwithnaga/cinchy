import React, { useState } from "react";
import images from "../../pictures/picture";
import useFetch from "../../hooks/useFetch";
import formatNumber from "../../utils/formatNumber";

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
}) => {
  return (
    <div className="bookingDetail">
      <div className="bookingDetailTop">
        <h6>Booking #{bookingId}</h6>
        <label>
          {deliveryDate} - {returnDate}
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
          <button
            className="cancelBtn"
            onClick={() => cancelBooking(motorGroupId, fullBookingId)}
          >
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
            <a href={deliveryURL}>{deliveryURL}</a>
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
            <a href={returnURL}>{returnURL}</a>
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
    </div>
  );
};

export default BookingDetail;
