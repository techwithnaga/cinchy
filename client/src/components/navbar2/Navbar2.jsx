import React, { useState, useEffect } from "react";
import images from "../../pictures/picture";
import "./navbar2.css";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [logoImg, setLogoImg] = useState(images.yellowGreenLogo);
  const [isDarkgreen, setIsDarkgreen] = useState(false);

  //   const [backgroundColor, setBackgroundColor] = useState ();

  //   const checkSize = () => {
  //     console.log(window.innerWidth);
  //   };

  const changeLogo = () => {
    if (window.innerWidth <= 1080) {
      setLogoImg(images.yellowWhiteLogo);
      setIsDarkgreen(true);
    } else {
      setLogoImg(images.yellowGreenLogo);
      setIsDarkgreen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", changeLogo);

    return () => {
      window.removeEventListener("resize", changeLogo);
    };
  }, []);
  return (
    <nav
      className="navbar2"
      style={{ backgroundColor: isDarkgreen ? "#00332C" : "#f2f7f5" }}
    >
      <div className="navbar2Container">
        <Link to="/">
          <img src={logoImg} alt="" />
        </Link>
        <ul className="navbar2Nav">
          <li className="navbar2Item">
            <a>About Us</a>
          </li>
          <li className="navbar2Item">
            <a>Pricing</a>
          </li>
          <li className="navbar2Item">
            <a>FAQ</a>
          </li>
          <li className="navbar2Item">
            <a>My Booking</a>
          </li>
          <li className="navbar2Support">
            <a>
              <BsWhatsapp className="whatsappIcon"></BsWhatsapp> Support
            </a>
          </li>
        </ul>
        <MdOutlineMenu
          onClick={() => setShowSidebar(true)}
          className="navbar2MenuIcon"
        ></MdOutlineMenu>
      </div>

      {showSidebar && (
        <>
          <div className="greyArea"></div>
          <div className="sidebar">
            <div className="sidebarContainer">
              <div className="sidebarIcon">
                <MdClose
                  className="navbar2CloseIcon"
                  onClick={() => {
                    setShowSidebar(false);
                  }}
                ></MdClose>
              </div>
              <ul className="sidebar2Nav">
                <li className="sidebar2Item">
                  <a>About Us</a>
                </li>
                <li className="sidebar2Item">
                  <a>Pricing</a>
                </li>
                <li className="sidebar2Item">
                  <a>FAQ</a>
                </li>
                <li className="sidebar2Item">
                  <a>My Booking</a>
                </li>
                <li className="sidebar2LastItem">
                  <a>
                    <BsWhatsapp className="whatsappIcon"></BsWhatsapp>Support
                  </a>
                </li>
                <li className="sidebar2LastItem">
                  <a>BOOK NOW</a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar2;
