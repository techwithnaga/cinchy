import React from "react";
import images from "../../pictures/picture";
import "./miscellaneous.css";

const Miscellaneous = () => {
  return (
    <div className="miscellaneous">
      <div className="video">
        <video
          src={images.videoHorizontal}
          autoPlay
          loop
          muted
          id="video"
          typeof="video/mp4"
        ></video>
      </div>
      <div className="miscellaneousContainer">
        <div className="miscellaneousHeader">
          <h1>Our prices include</h1>
          <br />
          <p>All Motor booking with Cinchy include</p>
        </div>
        <div className="miscellaneousItems">
          <div className="miscellaneousItem">
            <img src={images.helmet} alt="" />
            <h6>Safety & clean Helmet</h6>
          </div>
          <div className="miscellaneousItem">
            <img src={images.headCap} alt="" />
            <h6>Head Cap</h6>
          </div>
          <div className="miscellaneousItem">
            <img src={images.phoneHolder} alt="" />
            <h6>Phone Holder</h6>
          </div>
          <div className="miscellaneousItem">
            <img src={images.cancellations} alt="" />
            <h6>24hrs free Cancellation</h6>
          </div>
          <div className="miscellaneousItem">
            <img src={images.secondDriver} alt="" />
            <h6>2nd driver free</h6>
          </div>
          <div className="miscellaneousItem">
            <img src={images.unlimitedKM} alt="" />
            <h6>Unlimited KM</h6>
          </div>
          <div className="miscellaneousItem">
            <img src={images.roadAssistance} alt="" />
            <h6>Road Assistance</h6>
          </div>
          <div className="miscellaneousItem">
            <img src={images.onlinePayment} alt="" />
            <br />
            <h6>Online Payments (Coming Soon)</h6>
          </div>
        </div>
      </div>

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
