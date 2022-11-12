import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import "./search.css";
import { format } from "date-fns";
import SearchOption from "./SearchOption";
import { DateRange, Calendar } from "react-date-range";
import { BsCalendar } from "react-icons/bs";
import { BsInfoCircleFill } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
// import "react-calendar/dist/Calendar.css";
// import Calendar from "react-calendar";

const Search = () => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [duration, setDuration] = useState(0);

  const [times, setTimes] = useState({
    startTime: "09:00 AM",
    endTime: "09:00 AM",
  });

  const [openDateRange, setOpenDateRange] = useState(false);
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openEndTime, setOpenEndTime] = useState(false);

  const handleChange = (item) => {
    const selection = item.selection;
    if (selection.startDate === selection.endDate) {
      const dateRange = document.querySelector(".dateRange");
      dateRange.style.transform = "translateY(120px)";
    } else {
      setOpenDateRange(false);
    }

    setDates([item.selection]);
  };

  const handleTimeSelect = (e, input) => {
    setOpenStartTime(false);
    setOpenEndTime(false);
    setTimes({ ...times, [input]: e.target.innerHTML });
  };
  const day_in_millisecond = 24 * 60 * 60 * 1000;
  const calculateDuration = () => {
    let startDate = dates[0].startDate.getTime();
    let endDate = dates[0].endDate.getTime();
    setDuration(Math.ceil(Math.abs(endDate - startDate) / day_in_millisecond));
  };

  useEffect(() => {
    calculateDuration();
  }, [dates]);

  return (
    <>
      <Navbar2></Navbar2>
      <div className="search">
        <div className="searchContainer">
          <div className="searchDateTimeContainer">
            <h5>Pick-Up</h5>
            <div className="searchDateTime">
              <div className="searchDateTimeItem">
                <p>Date</p>

                <div
                  className="dateTimeSelection"
                  onClick={() => {
                    setOpenDateRange(!openDateRange);
                  }}
                >
                  <p>{`${format(dates[0].startDate, "dd MMM yyyy")}`}</p>
                  <BsCalendar></BsCalendar>
                </div>

                {openDateRange && (
                  <DateRange
                    className="dateRange"
                    minDate={new Date()}
                    editableDateInputs={true}
                    onChange={(item) => handleChange(item, "start")}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                  />
                )}
              </div>
              <div className="searchDateTimeItem">
                <p>Time</p>
                <div
                  className="dateTimeSelection"
                  onClick={() => {
                    setOpenStartTime(!openStartTime);
                  }}
                >
                  <p>{times.startTime}</p>
                  <IoTimeOutline style={{ fontSize: "130%" }}></IoTimeOutline>
                </div>
                {openStartTime && (
                  <ul className="timeSelection">
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      midnight
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      01:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      02:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      03:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      04:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      05:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      06:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      07:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      08:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      09:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      10:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      11:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      noon
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      01:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      02:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      03:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      04:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      05:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      06:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      07:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      08:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      09:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      10:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "startTime")}>
                      11:00 PM
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <br />
            <h5>Drop-Off</h5>
            <div className="searchDateTime">
              <div className="searchDateTimeItem">
                <p>Date</p>
                <div
                  className="dateTimeSelection"
                  onClick={() => {
                    setOpenDateRange(!openDateRange);
                  }}
                >
                  <p>{`${format(dates[0].endDate, "dd MMM yyyy")}`}</p>
                  <BsCalendar></BsCalendar>
                </div>
              </div>
              <div className="searchDateTimeItem">
                <p>Time</p>
                <div
                  className="dateTimeSelection"
                  onClick={() => {
                    setOpenEndTime(!openEndTime);
                  }}
                >
                  <p>{times.endTime}</p>
                  <IoTimeOutline style={{ fontSize: "130%" }}></IoTimeOutline>
                </div>
                {openEndTime && (
                  <ul className="timeSelection">
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      midnight
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      01:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      02:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      03:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      04:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      05:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      06:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      07:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      08:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      09:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      10:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      11:00 AM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      noon
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      01:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      02:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      03:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      04:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      05:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      06:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      07:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      08:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      09:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      10:00 PM
                    </li>
                    <li onClick={(e) => handleTimeSelect(e, "endTime")}>
                      11:00 PM
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <br />
            <h5>Duration</h5>
            <p>{duration} Day(s)</p>
            <br />
            <button className="searchBtn">Search</button>
          </div>

          <div className="avaiableBikes">
            <h5>Available Bikes</h5>
            <div className="avaiableBikesCategory">
              <button className="avaiableBikesBtn">All</button>
              <button className="avaiableBikesBtn">Style</button>
              <button className="avaiableBikesBtn">Comfort</button>
              <button className="avaiableBikesBtn">Compact</button>
            </div>
            <h6>Recommendation</h6>
            <div className="searchResults">
              <SearchOption></SearchOption>
              <SearchOption></SearchOption>
              <SearchOption></SearchOption>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
