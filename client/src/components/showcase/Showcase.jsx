import React from "react";
import "./showcase.css";
import images from "../../pictures/picture";
import { useNavigate } from "react-router-dom";

const Showcase = () => {
  const navigate = useNavigate();
  const handleBookNowClick = () => {
    console.log("hi");
    navigate("/search");
  };
  return (
    <div
      className="showcase"
      style={{ backgroundImage: `url(${images.homepageBackground})` }}
    >
      <div className="showcaseContainer">
        <h1>Make your travel great again</h1>
        <h5>Bali motor rental made easy so you can enjoy the journey.</h5>
        <button className="bookBtn" onClick={() => handleBookNowClick()}>
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default Showcase;
