import React from "react";
import images from "../../pictures/picture";

const BookingDetail = () => {
  return (
    <div className="bookingDetail">
      <div className="bookingDetailTop">
        <h6>Booking #1234567</h6>
        <label> Sun, 25 Dec 09:00 - Wed, 28 Dec 09:00</label>
      </div>
      <div className="bookingDetailMid">
        <img src={images.vespaPrimavera} alt="" />
        <div className="bookingDetailMidDescription">
          <h6>Vespa Primavera</h6>
          <label style={{ color: "red" }}>Style</label>
          <h6>IDR 480K</h6>
        </div>
      </div>

      <div className="bookingDetailBottom">
        <h6>Pick-Up Location:</h6>
        <p>Canggu, Bali</p>
        <p>https://goo.gl/maps/cqMqHfu9MbEmyu7aA</p>
        <br />
        <h6>Return Location:</h6>
        <p>Kuta, Bali</p>
        <p>https://www.google.com/maps/place/kartika+plaza/@-8.7362073</p>
        <br />
        <h6>Booking Paid Status:</h6>
        <p>Paid(Y)/Not paid yet(N)</p>
        <br />
        <h6>Vehicle Delivered Status:</h6>
        <p>No</p>
        <br />
        <h6>Vehicle Returned Status:</h6>
        <p>None</p>
      </div>
    </div>
  );
};

export default BookingDetail;
