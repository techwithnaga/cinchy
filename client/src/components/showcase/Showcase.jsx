import React from "react";
import "./showcase.css";
import images from "../../pictures/picture";
import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";

const Showcase = () => {
  const navigate = useNavigate();
  const handleBookNowClick = () => {
    navigate("/search");
  };
  return (
    <div
      className="showcase"
      style={{ backgroundImage: `url(${images.homepageBackground})` }}
    >
      <div className="showcaseContainer">
        <h1>Make your travel great again</h1>
        <h4>Bali motor rental made easy so you can enjoy the journey.</h4>
        <button className="bookBtn" onClick={() => handleBookNowClick()}>
          BOOK NOW
          <BiRightArrowAlt style={{ fontSize: "25px" }}></BiRightArrowAlt>
        </button>
      </div>
    </div>
  );
};

export default Showcase;
