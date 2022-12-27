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
          Enjoy more, worry less. That's what Cinchy is all about. Cinchy was
          born to help travelers like you to seamlessly get transportation
          rental in Bali with just few clicks away. It's that simple. Starting
          with Bali scooter/motor rental, we strive to offer reliable fleets and
          price transparency, with the utmost level of customer service in the
          industry. Our mission is what drives us to do everything possible to
          make Bali motor rental easy, so you can relax and enjoy the journey.
        </p>
        <h5>Why travel by scooter, you asked?</h5>
        <p>
          Riding a scooter in Bali is the fastest and easiest way of getting
          around.
        </p>
        <p>
          Not only you can enjoy the freedom to explore the hidden gems, but it
          is also cost-efficient!
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
