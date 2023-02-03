import React from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import images from "../../pictures/picture";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <Navbar2></Navbar2>
      <img src={images.notFoundPage} alt="" className="notFoundImage" />
    </div>
  );
};

export default NotFound;
