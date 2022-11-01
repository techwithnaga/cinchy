import React from "react";
import images from "../../pictures/picture";
import "./bikeOption.css";

const BikeOption = () => {
  return (
    <div className="bikeOption">
      <div className="bikeOptionHeader">
        <h6>Vespa Primevera</h6>
        <label style={{ color: "red" }} htmlFor="style">
          Style
        </label>
      </div>
      <div className="bikeOptionInfo">
        <img className="bikeOptionInfoImg" src={images.vespaPrimavera} alt="" />
        <ul className="bikeOptionInfoList">
          <li>
            <label className="bikeOptionInfoListItem">Sleek & Gorgeous</label>
          </li>

          <li>
            <label className="bikeOptionInfoListItem">
              No doubt. Best insta pic
            </label>
          </li>

          <li>
            <label className="bikeOptionInfoListItem">
              If you haven't try it. Why not?
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BikeOption;
