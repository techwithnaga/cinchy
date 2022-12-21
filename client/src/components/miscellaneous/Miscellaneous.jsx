import React from "react";
import images from "../../pictures/picture";
import "./miscellaneous.css";

const Miscellaneous = () => {
  return (
    <div className="miscellaneous">
      <div className="video">video</div>
      <div className="miscellaneousContainer">
        <div className="miscellaneousItems">
          <div className="miscellaneousHeader">
            <h1>Our prices include</h1>
            <br />
            <p>All Motor booking with Cinchy include</p>
          </div>
          <div className="miscellaneousItem">
            <img src={images.helmet} alt="" />
            <p>Safety & clean Helmet</p>
          </div>
          <div className="miscellaneousItem">
            <img src={images.headCap} alt="" />
            <p>Head Cap</p>
          </div>
          <div className="miscellaneousItem">
            <img src={images.phoneHolder} alt="" />
            <p>Phone Holder</p>
          </div>
          <div className="miscellaneousItem">
            <img src={images.cancellations} alt="" />
            <p>24hrs free Cancellation</p>
          </div>
          <div className="miscellaneousItem">
            <img src={images.secondDriver} alt="" />
            <p>2nd driver free</p>
          </div>
          <div className="miscellaneousItem">
            <img src={images.unlimitedKM} alt="" />
            <p>Unlimited KM</p>
          </div>
          <div className="miscellaneousItem">
            <img src={images.roadAssistance} alt="" />
            <p>Road Assistance</p>
          </div>
          <div className="miscellaneousItem">
            <img src={images.onlinePayment} alt="" />
            <br />
            <p>Online Payments (Coming Soon)</p>
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
