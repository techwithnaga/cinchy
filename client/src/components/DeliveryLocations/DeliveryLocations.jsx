import React from "react";
import images from "../../pictures/picture";
import "./DeliveryLocations.css";

const DeliveryLocations = () => {
  return (
    <div className="DeliveryLocations">
      <div className="deliveryLocationsContainer">
        <h1>More ways to get your rental delivered</h1>

        <div className="locationsWrapper">
          <div className="location">
            <img src={images.airport} alt="" />
            <h5>01.</h5>
            <h2>Bali Airport (Ngurah Rai)</h2>
          </div>
          <div className="location">
            <img src={images.hotel} alt="" />
            <h5>02.</h5>
            <h2>Hotel / Villa</h2>
          </div>
          <div className="location">
            <img src={images.store} alt="" />
            <h5>03.</h5>
            <h2>Store / Walk-in</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryLocations;
