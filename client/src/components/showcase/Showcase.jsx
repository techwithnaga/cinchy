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
        <h1>Bali motor rental</h1>
        <h1>made easy</h1>
        <h6>Simple to book, easy to use.</h6>
        <button className="bookBtn" onClick={() => handleBookNowClick()}>
          Check Availability
          <BiRightArrowAlt style={{ fontSize: "25px" }}></BiRightArrowAlt>
        </button>
      </div>
    </div>
  );
};

export default Showcase;
