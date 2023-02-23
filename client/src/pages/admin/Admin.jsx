import React, { useState, useEffect } from "react";
import images from "../../pictures/picture";
import "./admin.css";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
import FadeLoader from "react-spinners/FadeLoader";
import ModalCheckIn from "./ModalCheckIn";
import ModalCheckOut from "./ModalCheckOut";

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [logoImg, setLogoImg] = useState(images.yellowGreenLogo);
  const [isDarkgreen, setIsDarkgreen] = useState(false);
  const navigate = useNavigate();
  const [bookingDate, setBookingDate] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModalCheckIn, setShowModalCheckIn] = useState(false);
  const [showModalCheckOut, setShowModalCheckOut] = useState(false);
  const closeModal = () => {
    setShowModalCheckIn(false);
    setShowModalCheckOut(false);
  };
  const [data, setData] = useState({
    bookingId: "",
    customerName: "",
    checkOutTime: "",
  });

  const openModalCheckIn = (bookingId, name, checkOutTime) => {
    setData({
      bookingId: bookingId,
      customerName: name,
      checkOutTime: checkOutTime,
    });
    console.log(data);
    setShowModalCheckIn(true);
  };

  const openModalCheckOut = (bookingId, name, checkOutTime) => {
    setData({
      bookingId: bookingId,
      customerName: name,
      checkOutTime: checkOutTime,
    });
    console.log(data);
    setShowModalCheckOut(true);
  };

  if (showSidebar) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  const isLoggedIn = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    goToHomePage();
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

  const goToHomePage = () => {
    navigate("/");
  };

  const handleNavbar2Click = (page) => {
    navigate("/" + page);
  };

  const handleDateChange = (e) => {
    setBookingDate(e.target.value);
  };

  const getBookings = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:8800/api/booking/getbookingsbydate", {
        date: bookingDate,
      })
      .then((res) => {
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    window.addEventListener("resize", changeLogo);
    window.addEventListener("hashchange", changeLogo());

    return () => {
      window.removeEventListener("resize", changeLogo);
      window.removeEventListener("hashchange", changeLogo());
    };
  }, []);

  return (
    <div>
      <nav
        className="adminNavbar2"
        style={{ backgroundColor: isDarkgreen ? "#00332C" : "#f2f7f5" }}
      >
        <div className="adminNavbar2Container">
          <div>
            <h3 style={{ color: isDarkgreen ? "#f2f7f5" : "#00332C" }}>
              Cinchy Administration
            </h3>
          </div>
          <ul className="adminNavbar2Nav">
            {/* <li
              className="navbar2Item"
              onClick={() => handleNavbar2Click("aboutus")}
            >
              Pemesanan
            </li>
            <li
              className="navbar2Item"
              onClick={() => handleNavbar2Click("search")}
            >
              Jadwal
            </li> */}

            <li className="button" onClick={() => handleLogout()}>
              <div className="buttonTxt">
                <p>Log Out</p>
              </div>
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
                    className="adminNavbar2CloseIcon"
                    onClick={() => {
                      setShowSidebar(false);
                    }}
                  ></MdClose>
                </div>
                <ul className="sidebar2Nav">
                  {/* <li className="sidebar2Item">
                    <Link
                      style={{ color: "white", textDecoration: "none" }}
                      to="/aboutus"
                    >
                      Pemesanan
                    </Link>
                  </li>
                  <li className="sidebar2Item">
                    <Link
                      style={{ color: "white", textDecoration: "none" }}
                      to="/search"
                    >
                      Jadwal
                    </Link>
                  </li> */}
                  <li>
                    {isLoggedIn ? (
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
      <div className="adminBody">
        <h3>Jadwal</h3>
        <br />

        <div className="bookingDate">
          <div>
            <h5>Tanggal :</h5>
          </div>
          <div>
            <input
              type="date"
              className="bookingDateInput"
              onChange={(e) => handleDateChange(e)}
            />
          </div>
          <div
            className="submit button"
            style={{ marginTop: 0, padding: "0.4em" }}
            onClick={() => {
              getBookings();
            }}
          >
            <p className="buttonTxt">Submit</p>
          </div>
        </div>
        <br />

        <hr />
        {loading ? (
          <div className="spinner">
            <FadeLoader></FadeLoader>
          </div>
        ) : (
          <div>
            {result.length === 0 ? (
              <div>
                <h6>Tidak Ada Jadwal</h6>
                <hr />
              </div>
            ) : (
              result.map((booking, i) => {
                return (
                  <div key={i}>
                    <div className="jadwalBooking">
                      <div className="jadwalBookingInfo">
                        <h5
                          style={{
                            color:
                              booking.status === "Kembali" ? "red" : "green",
                          }}
                        >
                          {booking.status}
                        </h5>
                        <div className="jadwalBookingInfoItem">
                          <h6>Jam : </h6>
                          <p>{booking.time}</p>
                        </div>

                        <div className="jadwalBookingInfoItem">
                          <h6>Booking ID : </h6>
                          <p>{booking.bookingId}</p>
                        </div>

                        <div className="jadwalBookingInfoItem">
                          <h6>Jenis Motor : </h6>
                          <p>{booking.motorGroupName}</p>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <h6>Nama Customer : </h6>
                          <p>{booking.name}</p>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <h6>Lokasi : </h6>
                          <p>{booking.location}</p>
                        </div>
                        <div>
                          <h6>URL Lokasi : </h6>
                          <a href={booking.locationURL} target="_blank">
                            {booking.locationURL}
                          </a>
                        </div>
                      </div>

                      <div>
                        <div
                          className="checkincheckout button"
                          onClick={() =>
                            booking.status === "Kembali"
                              ? openModalCheckOut(
                                  booking.bookingId,
                                  booking.name,
                                  booking.time
                                )
                              : openModalCheckIn()
                          }
                        >
                          <p className="buttonTxt">
                            {booking.status === "Kembali"
                              ? "Check Out"
                              : "Check In"}
                          </p>
                        </div>
                        <div className="contact button">
                          <a
                            href={`https://api.whatsapp.com/send?phone=${booking.whatsappNumber}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div className="buttonWrapper">
                              <BsWhatsapp className="buttonTxt"></BsWhatsapp>
                              <p className="buttonTxt">Hubungi Customer</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <ModalCheckIn
        closeModal={closeModal}
        showModal={showModalCheckIn}
        data={data}
      ></ModalCheckIn>
      <ModalCheckOut
        closeModal={closeModal}
        showModal={showModalCheckOut}
        data={data}
      ></ModalCheckOut>
    </div>
  );
};

export default Admin;
