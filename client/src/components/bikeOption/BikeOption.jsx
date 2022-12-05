import React from "react";
import images from "../../pictures/picture";
import "./bikeOption.css";

const BikeOption = ({ groupName, category, description, photos }) => {
  return (
    <div className="bikeOption">
      <div className="bikeOptionHeader">
        <h6>{groupName}</h6>
        <label style={{ color: "red" }} htmlFor="style">
          {category}
        </label>
      </div>
      <div className="bikeOptionInfo">
        <img className="bikeOptionInfoImg" src={photos[0]} alt="" />
        <ul className="bikeOptionInfoList">
          {description.map((desc) => {
            return (
              <li>
                <label className="bikeOptionInfoListItem">{desc}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BikeOption;
