import React from "react";
import "./progressBar.css";

const ProgressBar = () => {
  return (
    <div className="progressBar">
      <div className="progressBarContainer">
        <div className="progressBarDotLine">
          <div className="progressBarDot"></div>
          <div className="progressBarLine"></div>
          <div className="progressBarDot"></div>
          <div className="progressBarLine"></div>
          <div className="progressBarDot"></div>
        </div>
        <br />
        <div className="progressBarText">
          <p className="progressBarItem">Choose booking</p>
          <p className="progressBarItem">Enter Info</p>
          <p className="progressBarItem">Confirmation</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
