import React, { useState } from "react";
import images from "../../pictures/picture";
import useFetch from "../../hooks/useFetch";

const BookingDetail = ({
  bookingId,
  deliveryDate,
  returnDate,
  groupName,
  photos,
  category,
  totalRentalPrice,
  deliveryArea,
  deliveryURL,
  returnArea,
  returnURL,
  isPaid,
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
          <h6>{groupName}</h6>
          <label style={{ color: "red" }}>{category}</label>
          <h6>IDR {totalRentalPrice}K</h6>
          <button className="cancelBtn"> Cancel </button>
        </div>
      </div>

      <div className="bookingDetailBottom">
        <h6>Delivery Area:</h6>
        <p>{deliveryArea}</p>
        <br />
        <h6>Delivery - Google Map Link</h6>
        {deliveryURL === "" ? <p>Not Provided</p> : <p>{deliveryURL}</p>}

        <br />
        <h6>Return Area:</h6>
        <p>{returnArea}</p>
        <br />
        <h6>Return - Google Map Link</h6>
        {deliveryURL === "" ? <p>Not Provided</p> : <p>{returnURL}</p>}
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
