import React, { useState, useEffect, useContext } from "react";
import images from "../../pictures/picture";
import "./navbar2.css";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar2 = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [logoImg, setLogoImg] = useState(images.yellowGreenLogo);
  const [isDarkgreen, setIsDarkgreen] = useState(false);
  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

  if (showSidebar) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

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
    window.addEventListener("hashchange", changeLogo());

    return () => {
      window.removeEventListener("resize", changeLogo);
      window.removeEventListener("hashchange", changeLogo());
    };
  }, []);

  const goToHomePage = () => {
    navigate("/");
  };

  const handleNavbar2Click = (page) => {
    navigate("/" + page);
  };

  return (
    <nav
      className="navbar2"
      style={{ backgroundColor: isDarkgreen ? "#00332C" : "#f2f7f5" }}
    >
      <div className="navbar2Container">
        <img
          src={logoImg}
          alt=""
          className="logoCinchy"
          onClick={() => goToHomePage()}
        />
        <ul className="navbar2Nav">
          <li
            className="navbar2Item"
            onClick={() => handleNavbar2Click("aboutus")}
          >
            About Us
          </li>
          <li
            className="navbar2Item"
            onClick={() => handleNavbar2Click("search")}
          >
            Pricing
          </li>

          <li
            className="navbar2Item"
            onClick={() => {
              handleNavbar2Click("faq");
            }}
          >
            FAQ
          </li>

          <li
            className="navbar2Item"
            onClick={() => handleNavbar2Click("mybooking")}
          >
            My Booking
          </li>
          <li className="navbar2Support">
            <a
              href="https://api.whatsapp.com/send?phone=6285174246249"
              target="_blank"
              rel="noreferrer"
            >
              <div className="navbar2whatsappWrapper">
                <BsWhatsapp className="whatsappIcon"></BsWhatsapp>
                <p>Support</p>
              </div>
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
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/aboutus"
                  >
                    About Us
                  </Link>
                </li>
                <li className="sidebar2Item">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/search"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="sidebar2Item">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/faq"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="sidebar2Item">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/mybooking"
                  >
                    My Booking
                  </Link>
                </li>
                <li className="sidebar2LastItem">
                  <a
                    href="https://api.whatsapp.com/send?phone=6285174246249"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <BsWhatsapp className="whatsappIcon"></BsWhatsapp>Support
                  </a>
                </li>
                <li className="sidebar2LastItem">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/search"
                  >
                    BOOK NOW
                  </Link>
                </li>
                <li>
                  {user ? (
                    <p onClick={() => handleLogout()}>Log Out</p>
                  ) : (
                    <p></p>
                  )}
                </li>
                {/* // <div className="navbar2Logout" onClick={() => handleLogout()}>
                //   {isLoggedIn ? <p>Log Out</p> : <p></p>}
                // </div> */}
              </ul>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar2;
