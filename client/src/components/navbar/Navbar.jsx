import React, { useState } from "react";
import images from "../../pictures/picture";
import "./navbar.css";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  if (showSidebar) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
  const isLoggedIn = sessionStorage.getItem("token");
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <nav className="navbar">
      <div className="navbarContainer">
        <img src={images.whiteWhiteLogo} alt="" style={{ width: "275px" }} />
        <ul className="navbarNav">
          <li className="navbarItem">
            <Link style={{ color: "#00332c" }} to="/aboutus">
              About Us
            </Link>
          </li>
          <li className="navbarItem">
            <Link style={{ color: "#00332c" }} to="/search">
              Pricing
            </Link>
          </li>
          <li className="navbarItem">
            <Link style={{ color: "#00332c" }} to="/faq">
              FAQ
            </Link>
          </li>
          <li className="navbarItem">
            <Link style={{ color: "#00332c" }} to="/mybooking">
              My Booking
            </Link>
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
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/aboutus"
                  >
                    About Us
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/search"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/faq"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/mybooking"
                  >
                    My Booking
                  </Link>
                </li>
                <li className="sidebarLastItem">
                  <a>
                    <BsWhatsapp className="whatsappIcon"></BsWhatsapp>Support
                  </a>
                </li>
                <li className="sidebarLastItem">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/search"
                  >
                    BOOK NOW
                  </Link>
                </li>
                <div className="navbarLogout" onClick={() => handleLogout()}>
                  {isLoggedIn ? <p>Log Out</p> : <p></p>}
                </div>
              </ul>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
