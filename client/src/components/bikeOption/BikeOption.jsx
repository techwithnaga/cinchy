import React from "react";
import images from "../../pictures/picture";
import "./bikeOption.css";

const BikeOption = () => {
  return (
    <div className="bikeOption">
      <h6>Vespa Primevera</h6>
      <label style={{ color: "red" }} htmlFor="style">
        Style
      </label>
      <div className="bikeOptionInfo">
        <img className="bikeOptionInfoImg" src={images.vespaPrimavera} alt="" />
        <ul className="bikeOptionInfoList">
          <li>
            <p>Sleek & Gorgeous</p>
          </li>
          <br />
          <li>
            <p>No doubt. Best insta pic</p>
          </li>
          <br />
          <li>
            <p>If you haven't try it. Why not?</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BikeOption;
