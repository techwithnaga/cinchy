import React from "react";
import images from "../../pictures/picture";
import "./motorOptions.css";
import { BsCheckCircleFill } from "react-icons/bs";

const MotorOptions = () => {
  return (
    <div className="motorOptions">
      <div className="motorOptionsContainer">
        <h1>Reliable & Hassle-free Rentals</h1>
        <div className="motorOptionsItems">
          <div className="motorOptionsItem">
            <div className="motorOptionsItemDescription">
              <h2>STYLE</h2>
              <h5>Vespa Primavera</h5>
            </div>
            <img src={images.vespaPrimavera} alt="" />
          </div>
          <div className="motorOptionsItem">
            <div className="motorOptionsItemDescription">
              <h2>COMFORT</h2>
              <h5>Yamaha NMAX 155</h5>
            </div>
            <img src={images.yamahaNmax} alt="" />
          </div>
          <div className="motorOptionsItem">
            <div className="motorOptionsItemDescription">
              <h2>COMPACT</h2>
              <h5>Honda Scopy 125</h5>
            </div>
            <img src={images.hondaScoopy} alt="" />
          </div>
        </div>

        <div className="motorOptionsReasons">
          <h1>Why Choose Cinchy?</h1>
          <br />
          <div className="reasons">
            <div className="reasonsWrapper">
              <div className="reason">
                <BsCheckCircleFill></BsCheckCircleFill>
                <p>
                  <span style={{ fontWeight: "bolder" }}>Reliable</span> and
                  well-maintained scooters
                </p>
              </div>
              <div className="reason">
                <BsCheckCircleFill></BsCheckCircleFill>
                <p>
                  <span style={{ fontWeight: "bolder" }}>Transparent</span> and
                  no hidden fee.
                </p>
              </div>
              <div className="reason">
                <BsCheckCircleFill></BsCheckCircleFill>
                <p>
                  <span style={{ fontWeight: "bolder" }}>Delivered</span> to
                  most urban areas in Bali.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorOptions;
