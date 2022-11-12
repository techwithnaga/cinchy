import React from "react";
import images from "../../pictures/picture";
import "./motorOptions.css";

const MotorOptions = () => {
  return (
    <div className="motorOptions">
      <div className="motorOptionsContainer">
        <h1>
          RELIABLE MOTOR RENTAL IN
          <span style={{ color: "#FAAE2B" }}> BALI</span>
        </h1>
        <p>New fleet | No hidden fee</p>
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
      </div>
    </div>
  );
};

export default MotorOptions;
