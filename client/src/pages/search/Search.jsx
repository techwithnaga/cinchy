import React, { useState } from "react";
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
  // const [dates, setDates] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  // });

  const [times, setTimes] = useState({
    startTime: "09:00 AM",
    endTime: "09:00 AM",
  });

  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const [openDateRange, setOpenDateRange] = useState(false);
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openEndTime, setOpenEndTime] = useState(false);

  // const handleSelect = (date, input) => {
  //   setOpenStartDate(false);
  //   setOpenEndDate(false);
  //   setDates({ ...dates, [input]: date });
  // };

  const handleChange = (item, input) => {
    console.log(item);
    if (input === "start") {
      setOpenStartDate(false);
      setOpenEndDate(true);
    }
    if (input === "end") {
      setOpenEndDate(false);
    }

    setDates([item.selection]);
  };

  const handleTimeSelect = (e, input) => {
    setOpenStartTime(false);
    setTimes({ ...times, [input]: e.target.innerHTML });
  };

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
                  // onClick={() => {
                  //   setOpenStartDate(!openStartDate);
                  //   setOpenEndDate(false);
                  // }}
                  onClick={() => {
                    setOpenStartDate(!openStartDate);
                    setOpenEndDate(false);
                  }}
                >
                  <p>{`${format(dates[0].startDate, "dd MMM yyyy")}`}</p>
                  <BsCalendar></BsCalendar>
                </div>

                {/* {openStartDate && (
                  <Calendar
                    date={new Date()}
                    className="date"
                    onChange={(date) => handleSelect(date, "startDate")}
                  />
                )} */}

                {openStartDate && (
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
                    setOpenEndDate(!openEndDate);
                    setOpenStartDate(false);
                  }}
                >
                  <p>{`${format(dates[0].endDate, "dd MMM yyyy")}`}</p>
                  <BsCalendar></BsCalendar>
                </div>

                {openEndDate && (
                  <DateRange
                    className="dateRange"
                    minDate={new Date()}
                    editableDateInputs={true}
                    onChange={(item) => handleChange(item, "end")}
                    moveRangeOnFirstSelection={true}
                    ranges={dates}
                  />
                )}

                {/* {openEndDate && (
                  <Calendar
                    date={new Date()}
                    className="date"
                    onChange={(date) => handleSelect(date, "endDate")}
                  />
                )} */}
              </div>
              <div className="searchDateTimeItem">
                <p>Time</p>
                <div className="dateTimeSelection">
                  <p>09:00 AM</p>
                  <IoTimeOutline style={{ fontSize: "130%" }}></IoTimeOutline>
                </div>
              </div>
            </div>
            <br />
            <h5>Duration</h5>
            <p>3 Day(s)</p>
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
