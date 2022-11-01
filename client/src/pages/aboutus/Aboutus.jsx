import React from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import "./aboutus.css";

const Aboutus = () => {
  return (
    <div className="aboutus">
      <Navbar2></Navbar2>
      <div className="aboutusContainer">
        <h2>About Us</h2>
        <br />
        <br />
        <br />
        <p>This is not your average Bali (motor) rental</p>
        <br />
        <p>
          Cinchy was born with the idea to welcome you when you first arrived in
          Bali and to company you exploring the Island of the Gods. Worry no
          more as we will gurantee to secure your transportation in Bali with
          easy click through Cinchy. ---bla bla bla--- So, what are you waiting
          for. Grab your lugage and enjoy your Bali journey. MAKE YOUR TRAVEL
          GREAT AGAIN
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
