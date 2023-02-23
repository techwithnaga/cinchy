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
            <p>+62 851-74-CINCHY</p>
            <br />
            <p> https://cinchy.life/</p>
          </div>
          <div className="footerCol2">
            <ul className="listNavItems">
              <li>
                <Link to={"/aboutus"} className="navItem">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={"/search"} className="navItem">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to={"/faq"} className="navItem">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={"/mybooking"} className="navItem">
                  My Booking
                </Link>
              </li>
            </ul>
          </div>
          <div className="footerCol3">
            <a
              href="https://api.whatsapp.com/send?phone=6285174246249"
              target="_blank"
            >
              <BsWhatsapp className="sosmedIcon"></BsWhatsapp>
            </a>
            <a href="https://www.instagram.com/cinchy.life/" target="_blank">
              <BsInstagram className="sosmedIcon"></BsInstagram>
            </a>

            <a href="https://www.facebook.com/cinchy.life" target="_blank">
              <BsFacebook className="sosmedIcon"></BsFacebook>
            </a>
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
