import React, { useState } from "react";
import images from "../../pictures/picture";
import "./navbar.css";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbarContainer">
        <img src={images.whiteWhiteLogo} alt="" />
        <ul className="navbarNav">
          <li className="navbarItem">
            <a>About Us</a>
          </li>
          <li className="navbarItem">
            <a>Pricing</a>
          </li>
          <li className="navbarItem">
            <a>FAQ</a>
          </li>
          <li className="navbarItem">
            <a>My Booking</a>
          </li>
          <li className="navbarSupport">
            <a>
              <BsWhatsapp className="whatsappIcon"></BsWhatsapp> Support
            </a>
          </li>
        </ul>
        <MdOutlineMenu
          onClick={() => setShowSidebar(true)}
          className="navbarMenuIcon"
        ></MdOutlineMenu>
      </div>

      {showSidebar && (
        <>
          <div className="greyArea"></div>
          <div className="sidebar">
            <div className="sidebarContainer">
              <div className="sidebarIcon">
                <MdClose
                  className="navbarCloseIcon"
                  onClick={() => {
                    setShowSidebar(false);
                  }}
                ></MdClose>
              </div>
              <ul className="sidebarNav">
                <li className="sidebarItem">
                  <a>About Us</a>
                </li>
                <li className="sidebarItem">
                  <a>Pricing</a>
                </li>
                <li className="sidebarItem">
                  <a>FAQ</a>
                </li>
                <li className="sidebarItem">
                  <a>My Booking</a>
                </li>
                <li className="sidebarLastItem">
                  <a>
                    <BsWhatsapp className="whatsappIcon"></BsWhatsapp>Support
                  </a>
                </li>
                <li className="sidebarLastItem">
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

export default Navbar;
