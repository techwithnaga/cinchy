import React from "react";
import images from "../../pictures/picture";
import { BsWhatsapp, BsInstagram, BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div
        className="footerTop"
        style={{ backgroundImage: `url(${images.footer})` }}
      >
        <div className="footerTopContainer">
          <div className="footerCol1">
            <img src={images.yellowWhiteLogo} alt="" />
            <br />
            <br />
            <p>CV Hidup Mudah Cinchy</p>
            <p>support@cinchy.life</p>
            <p>(021)1234765</p>
            <br />
            <p> https://cinchy.life/</p>
          </div>
          <div className="footerCol2">
            <ul className="listNavItems">
              <li>
                <Link className="navItem">About Us</Link>
              </li>
              <li>
                <Link className="navItem">Pricing</Link>
              </li>
              <li>
                <Link className="navItem">FAQ</Link>
              </li>
              <li>
                <Link className="navItem">My Booking</Link>
              </li>
            </ul>
          </div>
          <div className="footerCol3">
            <BsWhatsapp className="sosmedIcon"></BsWhatsapp>
            <BsInstagram className="sosmedIcon"></BsInstagram>
            <BsFacebook className="sosmedIcon"></BsFacebook>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <label>CINCHY 2023. ALL RIGHTS RESERVED. CV Hidup Mudah Cinchy</label>
      </div>
    </div>
  );
};

export default Footer;
