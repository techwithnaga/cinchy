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
            <div className="locationTxt">
              <h5>01.</h5>
              <h2>Bali Airport (Ngurah Rai)</h2>
            </div>
          </div>
          <div className="location">
            <img src={images.hotel} alt="" />
            <div className="locationTxt">
              <h5>02.</h5>
              <h2>Hotel / </h2>
              <h2>Villa</h2>
            </div>
          </div>
          <div className="location">
            <img src={images.store} alt="" />
            <div className="locationTxt">
              <h5>03.</h5>
              <h2>Store / Walk-in</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryLocations;
