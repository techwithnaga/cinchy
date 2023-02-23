import React, { useState } from "react";
import images from "../../pictures/picture";
import "./navbar.css";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const navigate = useNavigate();

  if (showSidebar) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
  const isLoggedIn = sessionStorage.getItem("token");
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("phoneNumber");
    window.location.reload();
  };

  const handleNavbarClick = (page) => {
    navigate("/" + page);
  };

  useEffect(() => {}, [showMeaning]);
  return (
    <nav className="navbar">
      <div className="bannerContainer">
        <div className="bannerContainerWrapper">
          <label>
            25% OFF Soft Opening Promo. Discount is reflected on checkout
            confirmation.
          </label>
        </div>
      </div>
      <div className="navbarContainer">
        <img
          src={images.whiteWhiteLogo}
          alt=""
          style={{ width: "275px", cursor: "pointer" }}
          // onMouseOver={setShowMeaning(true)}
          // onMouseLeave={setShowMeaning(false)}
          onMouseEnter={() => setShowMeaning(true)}
          onMouseLeave={() => setShowMeaning(false)}
        />
        {showMeaning && (
          <div className="meaning">
            <div className="triangle"></div>
            <p>[sɪn - chee] - defligthfully easy</p>
          </div>
        )}

        <ul className="navbarNav">
          <li
            className="navbarItem"
            onClick={() => handleNavbarClick("aboutus")}
          >
            About Us
          </li>
          <li
            className="navbarItem"
            onClick={() => handleNavbarClick("search")}
          >
            Pricing
          </li>
          <li className="navbarItem" onClick={() => handleNavbarClick("faq")}>
            FAQ
          </li>
          <li
            className="navbarItem"
            onClick={() => handleNavbarClick("mybooking")}
          >
            My Booking
          </li>
          <li className="navbarSupport">
            <a
              href="https://api.whatsapp.com/send?phone=6285174246249"
              target="_blank"
            >
              <div className="whatsappWrapper">
                <BsWhatsapp className="whatsappIcon"></BsWhatsapp>
                <p>Support</p>
              </div>
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
                  <a
                    href="https://api.whatsapp.com/send?phone=6285174246249"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="whatsappWrapper">
                      <BsWhatsapp className="whatsappIcon"></BsWhatsapp>
                      <p>Support</p>
                    </div>
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
                <li>
                  {isLoggedIn ? (
                    <p onClick={() => handleLogout()}>Log Out</p>
                  ) : (
                    <p></p>
                  )}
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
