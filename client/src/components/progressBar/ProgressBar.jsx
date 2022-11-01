import React from "react";
import "./progressBar.css";

const ProgressBar = ({ step }) => {
  return (
    <div className="progressBar">
      <div className="progressBarContainer">
        <div className="progressBarDotLine">
          <div className="progressBarDot"></div>
          <div className="progressBarLine"></div>
          <div className="progressBarDot"></div>
          <div
            className="progressBarLine"
            style={{ borderColor: step < 3 ? "#D9D9D9" : "#00332c" }}
          ></div>
          <div
            className="progressBarDot"
            style={{ backgroundColor: step < 3 ? "#D9D9D9" : "#00332c" }}
          ></div>
        </div>
        <br />
        <div className="progressBarText">
          <p className="progressBarItem">Choose booking</p>
          <p className="progressBarItem">Enter Info</p>
          <p
            className="progressBarItem"
            style={{ color: step < 3 ? "#D9D9D9" : "#00332c" }}
          >
            Confirmation
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
