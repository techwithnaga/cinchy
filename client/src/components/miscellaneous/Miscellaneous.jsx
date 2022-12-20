import React from "react";
import images from "../../pictures/picture";
import "./miscellaneous.css";

const Miscellaneous = () => {
  return (
    <div className="miscellaneous">
      <div className="video">video</div>
      <img src={images.accessories} alt="" />
      {/* <div className="miscellaneousContainer">
        <div className="miscellaneousText">
          <h1>DID YOU KNOW?</h1>
          <h5>All Motor Booking with Cinchy Includes:</h5>
        </div>
        <div className="miscellaneousItems">
          <div className="miscellaneousItem">
            <img src={images.helmet} alt="" />
            <h5>Clean Helmet</h5>
            <h3 style={{ color: "#FA5246" }}>FREE</h3>
          </div>
          <div className="miscellaneousItem">
            <img src={images.headCap} alt="" />
            <h5>Head Cap</h5>
            <h3 style={{ color: "#FA5246" }}>FREE</h3>
          </div>
          <div className="miscellaneousItem">
            <img src={images.phoneHolder} alt="" />
            <h5>Phone Holder</h5>
            <h3 style={{ color: "#FA5246" }}>FREE</h3>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Miscellaneous;
