import React from "react";
import "./bikeOption.css";

const BikeOption = ({ groupName, category, description, photos }) => {
  return (
    <div className="bikeOption">
      <div className="bikeOptionHeader">
        <label style={{ color: "red" }} htmlFor="style">
          {category}
        </label>
        <h6>{groupName}</h6>
      </div>
      <div className="bikeOptionInfo">
        <img
          className="bikeOptionInfoImg"
          src={photos[0]}
          alt=""
          referrerPolicy="no-referrer"
        />
        <ul className="bikeOptionInfoList">
          {description.map((desc, i) => {
            return (
              <li key={i}>
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
