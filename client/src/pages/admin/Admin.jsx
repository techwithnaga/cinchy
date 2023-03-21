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
import Button from "@mui/material/Button";

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [logoImg, setLogoImg] = useState(images.yellowGreenLogo);
  const [isDarkgreen, setIsDarkgreen] = useState(false);
  const navigate = useNavigate();
  const [bookingDate, setBookingDate] = useState("");
  const [result, setResult] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState({});
  const [allBookingsLoading, setAllBookingsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalCheckIn, setShowModalCheckIn] = useState(false);
  const [showModalCheckOut, setShowModalCheckOut] = useState(false);
  const [selectedMotor, setSelectedMotor] = useState();
  const [availableMotors, setAvailableMotors] = useState([]);

  const handleMotorSelected = (event) => {
    setSelectedMotor(event.target.value);
  };

  const closeModal = () => {
    setShowModalCheckIn(false);
    setShowModalCheckOut(false);
  };
  const [data, setData] = useState({
    bookingId: "",
    customerName: "",
    checkOutTime: "",
  });

  const openModalCheckIn = async (booking) => {
    setBooking(booking);
    await axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/motor/getAllAvailableMotors`
      )
      .then((res) => {
        setAvailableMotors(res.data);
        setShowModalCheckIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckIn = async (startingKm) => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/motor/checkin`, {
        bookingId: booking.longBookingId,
        licensePlate: selectedMotor,
        startingKm: startingKm,
      })
      .then(() => {
        setLoading(false);
        closeModal();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleCheckOut = async (endingKm, note) => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/motor/checkout`, {
        bookingId: booking.longBookingId,
        note: note,
        endingKM: endingKm,
      })
      .then(() => {
        setLoading(false);
        closeModal();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const openModalCheckOut = (booking) => {
    setBooking(booking);
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

  const handleSearch = async () => {
    setAllBookingsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/api/booking`)
      .then((res) => {
        setBookings(res.data);
        setAllBookingsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setAllBookingsLoading(false);
      });
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
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/booking/getbookingsbydate`,
        {
          date: bookingDate,
        }
      )
      .then((res) => {
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
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
  }, [selectedMotor]);

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
        <br />
        <div className="jadwalHeader">
          <h3>Check-in & Check-out</h3>
        </div>
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
                let checkInOutButtonTxt = "";
                let disabledButton = false;

                if (booking.status === "Kembali") {
                  if (booking.vehicleReturned) {
                    checkInOutButtonTxt = "Checked-Out";
                    disabledButton = true;
                  } else {
                    checkInOutButtonTxt = "Check Out";
                    disabledButton = false;
                  }
                } else {
                  if (booking.vehicleDelivered) {
                    checkInOutButtonTxt = "Checked-In";
                    disabledButton = true;
                  } else {
                    checkInOutButtonTxt = "Check In";
                    disabledButton = false;
                  }
                }
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
                          <p>{booking.motorCategory}</p>
                        </div>

                        <div className="jadwalBookingInfoItem">
                          <h6>License Plate : </h6>
                          <p>{booking.licensePlate}</p>
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
                        <button
                          className={
                            disabledButton
                              ? "checkincheckout disabledButton"
                              : "checkincheckout button"
                          }
                          disabled={disabledButton}
                          onClick={() =>
                            booking.status === "Kembali"
                              ? openModalCheckOut(booking)
                              : openModalCheckIn(booking)
                          }
                        >
                          <p className="buttonTxt">{checkInOutButtonTxt}</p>
                        </button>
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
        <br></br>
        <br></br>
        <div className="allBookingsHeader">
          <h3>Active Bookings</h3>
        </div>
        <br />

        <Button variant="contained" onClick={() => handleSearch()}>
          Search
        </Button>
        {allBookingsLoading ? (
          <div className="spinner">
            <FadeLoader></FadeLoader>
          </div>
        ) : (
          <div>
            <hr />
            {bookings.length === 0 ? (
              <div>
                <h6>Tidak Ada Booking</h6>
                <hr />
              </div>
            ) : (
              bookings.map((booking, i) => {
                return (
                  <div key={i} className as>
                    <div className="jadwalBooking">
                      <div className="jadwalBookingInfo">
                        <div className="jadwalBookingInfoItem">
                          <h6>Booking ID : </h6>
                          <p>{booking.bookingId}</p>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <h6>Jenis Motor : </h6>
                          <p>{booking.motorCategory}</p>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <h6>Plat No : </h6>
                          <p>{booking.licensePlate}</p>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <h6>KM Awal : </h6>
                          <p>{booking.startingKM}</p>
                        </div>

                        <div className="jadwalBookingInfoItem">
                          <h6>Nama Customer : </h6>
                          <p>{booking.name}</p>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <h6>Total Price : </h6>
                          <p>{booking.totalPrice}</p>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <h6>Delivery Date : </h6>
                          <p>{booking.deliveryDate.slice(0, 22)}</p>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <h6>Return Date : </h6>
                          <p>{booking.returnDate.slice(0, 22)}</p>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <h6>Delivery Location : </h6>
                          <p>{booking.deliveryLocation} </p>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <a href={booking.deliveryLocationURL}>
                            {booking.deliveryLocationURL}
                          </a>
                        </div>
                        <div className="jadwalBookingInfoItem">
                          <h6>Return Location : </h6>
                          <p>{booking.returnLocation}</p>
                        </div>
                        <div>
                          <a href={booking.returnLocationURL}>
                            {booking.returnLocationURL}
                          </a>
                        </div>
                      </div>
                      <div>
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
        bookingId={booking.bookingId}
        handleCheckIn={handleCheckIn}
        customerName={booking.name}
        availableMotors={availableMotors}
        data={result}
        handleMotorSelected={handleMotorSelected}
        selectedMotor={selectedMotor}
      ></ModalCheckIn>
      <ModalCheckOut
        closeModal={closeModal}
        showModal={showModalCheckOut}
        bookingId={booking.bookingId}
        licensePlate={booking.licensePlate}
        customerName={booking.name}
        checkOutTime={booking.time}
        data={result}
        handleCheckOut={handleCheckOut}
        vehicleReturned={booking.vehicleReturned}
      ></ModalCheckOut>
    </div>
  );
};

export default Admin;
