import React from "react";
import images from "../../pictures/picture";
import "./steps.css";

const Steps = () => {
  return (
    <div className="steps">
      <div className="stepsContainer">
        <div className="stepContainerText">
          <h1
            style={{
              color: "#00332C",
              fontSize: "96px",
            }}
          >
            3
          </h1>
          <h1 style={{ color: "#F2F7F5" }}>EASY</h1>
          <h1 style={{ color: "#FA5246" }}>STEPS</h1>
        </div>
        <img className="vespaWhiteImg" src={images.vespaWhite} alt="" />
        <img className="vespaMerahImg" src={images.vespa} alt="" />
        <div className="stepsItems">
          <div className="stepsItem">
            <div className="stepItemHeader">
              <h5>01.</h5>
              <h2>SEARCH & BOOK</h2>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum
              perferendis laborum ratione doloremque unde eum qui iusto ullam
              similique cupiditate.
            </p>
          </div>
          <div className="stepsItem">
            <div className="stepItemHeader">
              <h5>02.</h5>
              <h2>ARRIVE IN BALI</h2>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum
              perferendis laborum ratione doloremque unde eum qui iusto ullam
              similique cupiditate.
            </p>
          </div>
          <div className="stepsItem">
            <div className="stepItemHeader">
              <h5>03.</h5>
              <h2>GET DELIVERED</h2>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum
              perferendis laborum ratione doloremque unde eum qui iusto ullam
              similique cupiditate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
