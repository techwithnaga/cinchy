import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import "./search.css";
import { format } from "date-fns";
import SearchOption from "./SearchOption";
import { DateRange } from "react-date-range";
import { BsCalendar } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import useFetch from "../../hooks/useFetch";

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
  const milisecondsInHour = 60 * 60 * 1000;

  const [times, setTimes] = useState({
    startTime: "09:00 AM",
    startTimeVal: 9 * milisecondsInHour,
    endTime: "09:00 AM",
    endTimeVal: 9 * milisecondsInHour,
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

  const handleTimeSelect = (e, input, val) => {
    setOpenStartTime(false);
    setOpenEndTime(false);
    setTimes({ ...times, [input]: e.target.innerHTML, [input + "Val"]: val });
  };

  const day_in_millisecond = 24 * 60 * 60 * 1000;
  const calculateDuration = () => {
    let startDate = dates[0].startDate.getTime() + times.startTimeVal;
    let endDate = dates[0].endDate.getTime() + times.endTimeVal;
    setDuration(Math.ceil(Math.abs(endDate - startDate) / day_in_millisecond));
  };

  const [option, setOption] = useState("");

  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/motorGroup",
    "get"
  );

  const [filteredGroup, setFilteredGroup] = useState(data);

  const handleSearch = () => {
    reFetch();
    setOption("All");
  };

  const filterData = () => {
    if (option !== "All") {
      setFilteredGroup(data.filter((item) => item.category === option));
    } else {
      setFilteredGroup(data);
    }
  };

  useEffect(() => {
    calculateDuration();
    filterData();
  }, [dates, times, option]);

  useEffect(() => {}, [filteredGroup]);

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
                    <li onClick={(e) => handleTimeSelect(e, "startTime", 0)}>
                      midnight
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          0.5 * milisecondsInHour
                        )
                      }
                    >
                      12:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 1 * milisecondsInHour)
                      }
                    >
                      01:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          1.5 * milisecondsInHour
                        )
                      }
                    >
                      01:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 2 * milisecondsInHour)
                      }
                    >
                      02:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          2.5 * milisecondsInHour
                        )
                      }
                    >
                      02:30 AM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 3 * milisecondsInHour)
                      }
                    >
                      03:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          3.5 * milisecondsInHour
                        )
                      }
                    >
                      03:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 4 * milisecondsInHour)
                      }
                    >
                      04:00 AM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          4.5 * milisecondsInHour
                        )
                      }
                    >
                      04:30 AM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 5 * milisecondsInHour)
                      }
                    >
                      05:00 AM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          5.5 * milisecondsInHour
                        )
                      }
                    >
                      05:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 6 * milisecondsInHour)
                      }
                    >
                      06:00 AM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          6.5 * milisecondsInHour
                        )
                      }
                    >
                      06:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 7 * milisecondsInHour)
                      }
                    >
                      07:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          7.5 * milisecondsInHour
                        )
                      }
                    >
                      07:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 8 * milisecondsInHour)
                      }
                    >
                      08:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          8.5 * milisecondsInHour
                        )
                      }
                    >
                      08:30 AM
                    </li>
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
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          21.5 * milisecondsInHour
                        )
                      }
                    >
                      09:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 22 * milisecondsInHour)
                      }
                    >
                      10:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          22.5 * milisecondsInHour
                        )
                      }
                    >
                      10:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "startTime", 23 * milisecondsInHour)
                      }
                    >
                      11:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(
                          e,
                          "startTime",
                          23.5 * milisecondsInHour
                        )
                      }
                    >
                      11:30 PM
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
                    <li onClick={(e) => handleTimeSelect(e, "endTime", 0)}>
                      midnight
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 0.5 * milisecondsInHour)
                      }
                    >
                      12:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 1 * milisecondsInHour)
                      }
                    >
                      01:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 1.5 * milisecondsInHour)
                      }
                    >
                      01:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 2 * milisecondsInHour)
                      }
                    >
                      02:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 2.5 * milisecondsInHour)
                      }
                    >
                      02:30 AM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 3 * milisecondsInHour)
                      }
                    >
                      03:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 3.5 * milisecondsInHour)
                      }
                    >
                      03:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 4 * milisecondsInHour)
                      }
                    >
                      04:00 AM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 4.5 * milisecondsInHour)
                      }
                    >
                      04:30 AM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 5 * milisecondsInHour)
                      }
                    >
                      05:00 AM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 5.5 * milisecondsInHour)
                      }
                    >
                      05:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 6 * milisecondsInHour)
                      }
                    >
                      06:00 AM
                    </li>

                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 6.5 * milisecondsInHour)
                      }
                    >
                      06:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 7 * milisecondsInHour)
                      }
                    >
                      07:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 7.5 * milisecondsInHour)
                      }
                    >
                      07:30 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 8 * milisecondsInHour)
                      }
                    >
                      08:00 AM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 8.5 * milisecondsInHour)
                      }
                    >
                      08:30 AM
                    </li>
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
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 21.5 * milisecondsInHour)
                      }
                    >
                      09:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 22 * milisecondsInHour)
                      }
                    >
                      10:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 22.5 * milisecondsInHour)
                      }
                    >
                      10:30 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 23 * milisecondsInHour)
                      }
                    >
                      11:00 PM
                    </li>
                    <li
                      onClick={(e) =>
                        handleTimeSelect(e, "endTime", 23.5 * milisecondsInHour)
                      }
                    >
                      11:30 PM
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
              Search
            </button>
          </div>

          <div className="avaiableBikes">
            <h5>Available Bikes</h5>
            <div className="avaiableBikesCategory">
              <button
                className="avaiableBikesBtn"
                onClick={() => setOption("All")}
              >
                All
              </button>
              <button
                className="avaiableBikesBtn"
                onClick={() => setOption("Style")}
              >
                Style
              </button>
              <button
                className="avaiableBikesBtn"
                onClick={() => setOption("Comfort")}
              >
                Comfort
              </button>
              <button
                className="avaiableBikesBtn"
                onClick={() => setOption("Compact")}
              >
                Compact
              </button>
            </div>
            <h6>Recommendation</h6>
            <div className="searchResults">
              {filteredGroup.map((motorGroup) => {
                return (
                  <SearchOption
                    key={motorGroup._id}
                    motorGroup={motorGroup}
                    days={duration}
                  ></SearchOption>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
