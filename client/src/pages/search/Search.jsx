import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import "./search.css";
import { format, parseISO } from "date-fns";
import SearchOption from "./SearchOption";
import { BsCalendar3 } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import FadeLoader from "react-spinners/FadeLoader";
import "react-calendar/dist/Calendar.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import InputAdornment from "@mui/material/InputAdornment";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import axios from "axios";
import moment from "moment-timezone";

const Search = () => {
  let baliTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Brunei",
  });

  var now = moment();
  var localOffset = now.utcOffset();
  let deltaMiliseconds = localOffset * 60 * 1000;

  // console.log(new Date(baliDateInMs).toString());

  // const [dates, setDates] = useState([
  //   {
  //     startDate: new Date(todayDate + "09:00:00.000Z"),
  //     endDate: new Date(todayDate + "09:00:00.000Z"),
  //     key: "selection",
  //   },
  // ]);

  const [duration, setDuration] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const dayInMillisecond = 24 * 60 * 60 * 1000;
  const milisecondsInHour = 60 * 60 * 1000;

  const [times, setTimes] = useState({
    startTime: "09:00 AM",
    startTimeVal: 9 * milisecondsInHour,
    endTime: "09:00 AM",
    endTimeVal: 9 * milisecondsInHour,
  });

  const [openDeliveryCalendar, setOpenDeliveryCalendar] = useState(false);
  const [openReturnCalendar, setOpenReturnCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openEndTime, setOpenEndTime] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(baliTime.split(",")[0])
  );
  const [returnDate, setReturnDate] = useState(
    new Date(new Date(baliTime.split(",")[0]).getTime() + dayInMillisecond)
  );

  const [localDeliveryDateTimeInMs, setLocalDeliveryDateTimeInMs] = useState(0);
  const [localReturnDateTimeInMs, setLocalReturnDateTimeInMs] = useState(0);
  const [UTCDeliveryDateTimeInMs, setUTCDeliveryDateTimeInMs] = useState(0);
  const [UTCReturnDateTimeInMs, setUTCReturnDateTimeInMs] = useState(0);
  const [UTCDeliveryDateTimeInString, SetUTCDeliveryDateTimeInString] =
    useState("");
  const [UTCReturnDateTimeInString, SetUTCReturnDateTimeInString] =
    useState("");

  const [data, setData] = useState([]);

  const handleTimeSelect = (e, input, val) => {
    setOpenStartTime(false);
    setOpenEndTime(false);
    setShowSearchResult(false);
    setTimes({ ...times, [input]: e.target.innerHTML, [input + "Val"]: val });
  };

  const calculateDuration = () => {
    //converting to UTC MS
    let startDate =
      deliveryDate.getTime() + times.startTimeVal + deltaMiliseconds;
    setUTCDeliveryDateTimeInMs(startDate);
    SetUTCDeliveryDateTimeInString(new Date(startDate).toISOString());
    console.log("delivery String : " + UTCDeliveryDateTimeInString);
    // console.log(
    //   "delivery date" + new Date(UTCDeliveryDateTimeInString),
    //   "E, d MMM HH:mm"
    // );
    setLocalDeliveryDateTimeInMs(deliveryDate.getTime() + times.startTimeVal);

    let endDate = returnDate.getTime() + times.endTimeVal + deltaMiliseconds;
    setUTCReturnDateTimeInMs(endDate);
    SetUTCReturnDateTimeInString(new Date(endDate).toISOString());
    // console.log("return date" + UTCReturnDateTimeInString);
    setLocalReturnDateTimeInMs(returnDate.getTime() + times.endTimeVal);
    let duration = Math.ceil(Math.abs(endDate - startDate) / dayInMillisecond);
    setDuration(duration);
  };

  const [option, setOption] = useState("");

  // const { data, loading, error, reFetch } = useFetch(
  //   `${process.env.REACT_APP_API_ENDPOINT}/api/motorGroup/${deliveryDateInMs}&${returnDateInMs}`,
  //   "get"
  // );

  const [filteredGroup, setFilteredGroup] = useState(data);

  const handleSearch = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/motorGroup/${UTCDeliveryDateTimeInMs}&${UTCReturnDateTimeInMs}`
      )
      .then((res) => {
        setData(res.data);
        setFilteredGroup(res.data);
        setShowSearchResult(true);
        setOption("All");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const filterData = (opt) => {
    setOption(opt);
    if (opt !== "All") {
      setFilteredGroup(data.filter((item) => item.category === opt));
    } else {
      setFilteredGroup(data);
    }
  };

  const handleDateChange = (item, type) => {
    if (type === "delivery") {
      setDeliveryDate(item);
      setOpenDeliveryCalendar(false);
    } else {
      setReturnDate(item);
      setOpenReturnCalendar(false);
    }
  };

  useEffect(() => {
    calculateDuration();
    setShowSearchResult(false);
  }, [deliveryDate, returnDate, times]);

  // useEffect(() => {}, [filteredGroup, openEndTime, openStartTime]);

  return (
    <>
      <Navbar2></Navbar2>
      <div className="search">
        <div className="searchContainer">
          <div className="searchDateTimeContainer">
            <div className="searchDateTime">
              <div className="searchDateTimeItem">
                <h6>Pick-Up Date</h6>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label=""
                    value={deliveryDate}
                    inputFormat="dd MMM yyyy"
                    minDate={
                      new Date(
                        new Date().toLocaleString("en-US", {
                          timeZone: "Asia/Brunei",
                        })
                      )
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ cursor: "pointer" }}
                        >
                          <BsCalendar3></BsCalendar3>
                        </InputAdornment>
                      ),
                    }}
                    onChange={(newValue) => {
                      setShowSearchResult(false);
                      newValue.setHours(0, 0, 0, 0);

                      //adjust return date if needed
                      if (newValue.getTime() >= returnDate.getTime()) {
                        setReturnDate(
                          new Date(newValue.getTime() + dayInMillisecond)
                        );
                      }
                      setDeliveryDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} disabled />}
                  />
                  {/* <DatePicker
                    disablePast
                    label=""
                    openTo="day"
                    inputFormat="dd MMM yyyy"
                    value={deliveryDate}
                    onChange={(newValue) => {
                      setDeliveryDate(newValue);
                    }}
                    renderInput={(params) => (
                      // <TextField
                      //   {...params}
                      //   sx={inputSx}
                      //   disabled
                      //   onkeydown="return false;"
                      // />
                      <div
                        className="dateTimeSelection"
                        onClick={() => {
                          setOpenDeliveryCalendar(!openDeliveryCalendar);
                        }}
                      >
                        <p>{`${format(deliveryDate, "dd MMM yyyy")}`}</p>
                        <BsCalendar></BsCalendar>
                      </div>
                    )}
                    // InputProps={{
                    // sx: inputSx,
                    // }}
                  />
                  <CalendarPicker
                    disablePast
                    label=""
                    openTo="day"
                    views={["day", "month"]}
                    value={returnDate}
                    onChange={(newValue) => {
                      setReturnDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  /> */}
                </LocalizationProvider>
              </div>
              <div className="searchDateTimeItem">
                <h6>Pick-up Time</h6>
                <div
                  className="dateTimeSelection"
                  onClick={() => {
                    setOpenStartTime(!openStartTime);
                    setOpenEndTime(false);
                  }}
                >
                  <p>{times.startTime}</p>
                  <IoTimeOutline style={{ fontSize: "130%" }}></IoTimeOutline>
                </div>
                {openStartTime && (
                  <ul className="timeSelection">
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 9 * milisecondsInHour)
                      }
                    >
                      09:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          9.5 * milisecondsInHour
                        )
                      }
                    >
                      09:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 10 * milisecondsInHour)
                      }
                    >
                      10:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          10.5 * milisecondsInHour
                        )
                      }
                    >
                      10:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 11 * milisecondsInHour)
                      }
                    >
                      11:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          11.5 * milisecondsInHour
                        )
                      }
                    >
                      11:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 12 * milisecondsInHour)
                      }
                    >
                      noon
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          12.5 * milisecondsInHour
                        )
                      }
                    >
                      12:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 13 * milisecondsInHour)
                      }
                    >
                      01:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          13.5 * milisecondsInHour
                        )
                      }
                    >
                      01:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 14 * milisecondsInHour)
                      }
                    >
                      02:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          14.5 * milisecondsInHour
                        )
                      }
                    >
                      02:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 15 * milisecondsInHour)
                      }
                    >
                      03:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          15.5 * milisecondsInHour
                        )
                      }
                    >
                      03:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 16 * milisecondsInHour)
                      }
                    >
                      04:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          16.5 * milisecondsInHour
                        )
                      }
                    >
                      04:30 PM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 17 * milisecondsInHour)
                      }
                    >
                      05:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          17.5 * milisecondsInHour
                        )
                      }
                    >
                      05:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 18 * milisecondsInHour)
                      }
                    >
                      06:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          18.5 * milisecondsInHour
                        )
                      }
                    >
                      06:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 19 * milisecondsInHour)
                      }
                    >
                      07:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          19.5 * milisecondsInHour
                        )
                      }
                    >
                      07:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 20 * milisecondsInHour)
                      }
                    >
                      08:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          20.5 * milisecondsInHour
                        )
                      }
                    >
                      08:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 21 * milisecondsInHour)
                      }
                    >
                      09:00 PM
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <br />
            <div className="searchDateTime">
              <div className="searchDateTimeItem">
                <h6>Drop-off Date</h6>
                {/* <div
                  className="dateTimeSelection"
                  onClick={() => {
                    setOpenReturnCalendar(!openReturnCalendar);
                  }}
                >
                  <p>{`${format(returnDate, "dd MMM yyyy")}`}</p>
                  <BsCalendar></BsCalendar>
                </div> */}
                {/* {openReturnCalendar && ( */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label=""
                    value={returnDate}
                    inputFormat="dd MMM yyyy"
                    minDate={
                      new Date(
                        new Date().toLocaleString("en-US", {
                          timeZone: "Asia/Brunei",
                        })
                      )
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ cursor: "pointer" }}
                        >
                          <BsCalendar3></BsCalendar3>
                        </InputAdornment>
                      ),
                    }}
                    onChange={(newValue) => {
                      newValue.setHours(0, 0, 0, 0);
                      if (newValue.getTime() <= deliveryDate.getTime()) {
                        let newDeliveryDate = new Date(
                          newValue.getTime() - dayInMillisecond
                        );
                        setDeliveryDate(newDeliveryDate);
                      }
                      setReturnDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} disabled />}
                  />
                </LocalizationProvider>
                {/* )} */}
              </div>
              <div className="searchDateTimeItem">
                <h6>Drop-off Time</h6>
                <div
                  className="dateTimeSelection"
                  onClick={() => {
                    setOpenEndTime(!openEndTime);
                    setOpenStartTime(false);
                  }}
                >
                  <p>{times.endTime}</p>
                  <IoTimeOutline style={{ fontSize: "130%" }}></IoTimeOutline>
                </div>
                {openEndTime && (
                  <ul className="timeSelection">
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 9 * milisecondsInHour)
                      }
                    >
                      09:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 9.5 * milisecondsInHour)
                      }
                    >
                      09:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 10 * milisecondsInHour)
                      }
                    >
                      10:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 10.5 * milisecondsInHour)
                      }
                    >
                      10:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 11 * milisecondsInHour)
                      }
                    >
                      11:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 11.5 * milisecondsInHour)
                      }
                    >
                      11:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 12 * milisecondsInHour)
                      }
                    >
                      noon
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 12.5 * milisecondsInHour)
                      }
                    >
                      12:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 13 * milisecondsInHour)
                      }
                    >
                      01:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 13.5 * milisecondsInHour)
                      }
                    >
                      01:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 14 * milisecondsInHour)
                      }
                    >
                      02:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 14.5 * milisecondsInHour)
                      }
                    >
                      02:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 15 * milisecondsInHour)
                      }
                    >
                      03:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 15.5 * milisecondsInHour)
                      }
                    >
                      03:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 16 * milisecondsInHour)
                      }
                    >
                      04:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 16.5 * milisecondsInHour)
                      }
                    >
                      04:30 PM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 17 * milisecondsInHour)
                      }
                    >
                      05:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 17.5 * milisecondsInHour)
                      }
                    >
                      05:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 18 * milisecondsInHour)
                      }
                    >
                      06:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 18.5 * milisecondsInHour)
                      }
                    >
                      06:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 19 * milisecondsInHour)
                      }
                    >
                      07:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 19.5 * milisecondsInHour)
                      }
                    >
                      07:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 20 * milisecondsInHour)
                      }
                    >
                      08:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 20.5 * milisecondsInHour)
                      }
                    >
                      08:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 21 * milisecondsInHour)
                      }
                    >
                      09:00 PM
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <br />
            <h5>Duration</h5>
            <p>{duration} Day(s)</p>
            <br />
            <button className="searchBtn" onClick={() => handleSearch()}>
              Check availability
            </button>
          </div>

          {showSearchResult && (
            <div className="avaiableBikes">
              <h5>Available Bikes</h5>
              <div className="avaiableBikesCategory">
                <button
                  className="avaiableBikesBtn"
                  onClick={() => filterData("All")}
                >
                  All
                </button>

                {/* <div
                  className="avaiableBikesDiv"
                  onClick={() => setOption("All")}
                >
                  Style
                </div> */}
                <button
                  className="avaiableBikesBtn"
                  onClick={() => filterData("Style")}
                >
                  Style
                </button>
                <button
                  className="avaiableBikesBtn"
                  onClick={() => filterData("Comfort")}
                >
                  Comfort
                </button>
                <button
                  className="avaiableBikesBtn"
                  onClick={() => filterData("Compact")}
                >
                  Compact
                </button>
              </div>
              <h6>Recommendation</h6>
              <div className="searchResults">
                {filteredGroup.map((motorGroup, i) => {
                  return (
                    <SearchOption
                      key={i}
                      motorGroup={motorGroup}
                      days={duration}
                      UTCDeliveryDateTimeInString={UTCDeliveryDateTimeInString}
                      UTCReturnDateTimeInString={UTCReturnDateTimeInString}
                      localDeliveryDateTimeInMs={localDeliveryDateTimeInMs}
                      localReturnDateTimeInMs={localReturnDateTimeInMs}
                      UTCDeliveryDateTimeInMs={UTCDeliveryDateTimeInMs}
                      UTCReturnDateTimeInMs={UTCReturnDateTimeInMs}
                      rentalDuration={duration}
                      isAvailable={motorGroup.isAvailable}
                    ></SearchOption>
                  );
                })}
              </div>
            </div>
          )}

          {loading && (
            <div className="loaderContainer">
              <FadeLoader
                color="#00332C"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="searchLoader"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
