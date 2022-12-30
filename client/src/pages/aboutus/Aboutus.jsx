import React from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import images from "../../pictures/picture";
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
        <h5>Enjoy more, worry less.</h5>
        <br />
        <p>That's what Cinchy is all about.</p>
        <br />
        <p>
          Cinchy was born to help travelers like you to seamlessly get
          transportation rental in Bali with just few clicks away. It's that
          simple.
        </p>
        <br />
        <p>
          Starting with Bali scooter/motor rental, we strive to offer reliable
          fleets and price transparency, with the utmost level of customer
          service in the industry.
        </p>
        <br />
        <p>
          Our mission is what drives us to do everything possible to make Bali
          motor rental easy, so you can relax and enjoy the journey.
        </p>
        <br />
        <img src={images.aboutusMotor} alt="aboutusMotor" />
        <br />
        <br />
        <br />
        <br />
        <h5>Why travel by scooter, you asked?</h5>
        <br />
        <p>
          Riding a scooter in Bali is the fastest and easiest way of getting
          around.
        </p>
        <br />
        <p>
          Not only you can enjoy the freedom to explore the hidden gems, but it
          is also cost-efficient!
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Aboutus;
