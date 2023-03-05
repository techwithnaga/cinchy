import React, { useState, useEffect } from "react";
import "./searchV2.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { formLabelClasses, TextField } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import FadeLoader from "react-spinners/FadeLoader";
import Navbar2 from "../../components/navbar2/Navbar2";
import SearchOption from "./SearchOption";
import { BsArrowRight } from "react-icons/bs";
// import { createMuiTheme } from "@material-ui/core";
// import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import { SxProps } from "@mui/system";

const SearchV2 = () => {
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  // const { data, loading, error, reFetch } = useFetch(
  //   `${
  //     process.env.REACT_APP_API_ENDPOINT
  //   }/api/motorGroup/${deliveryDate.getTime()}&${returnDate.getTime()}`,
  //   "get"
  // );
  const [loading, setLoading] = useState(formLabelClasses);
  const [duration, setDuration] = useState(0);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [data, setData] = useState([]);
  const [filteredGroup, setFilteredGroup] = useState([]);
  const [option, setOption] = useState("");
  const dayInMillisecond = 24 * 60 * 60 * 1000;

  const handleSearch = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_ENDPOINT
        }/api/motorGroup/${deliveryDate.getTime()}&${returnDate.getTime()}`
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

  const calculateDuration = () => {
    setDuration(
      Math.ceil(Math.abs(returnDate - deliveryDate) / dayInMillisecond)
    );
  };

  const filterData = (opt) => {
    setOption(opt);
    if (opt !== "All") {
      setFilteredGroup(data.filter((item) => item.category === opt));
    } else {
      setFilteredGroup(data);
    }
  };
  var d = new Date();
  d.setTime(d.getTime() + 8 * 60 * 60 * 1000);
  console.log(d.getTime());

  useEffect(() => {
    calculateDuration();
  }, [deliveryDate, returnDate]);
  const color = "#00332c";

  // const defaultMaterialTheme = createMuiTheme({
  //   palette: {
  //     primary: "#00332c",
  //   },
  // });

  const popperSx = {
    "&  .Mui-selected": {
      backgroundColor: "#00332c",
    },

    "& .MuiButtonBase-root:focus": {
      backgroundColor: "#00332c",
      color: "#fff",
    },

    "& .MuiClock-pin": {
      backgroundColor: "#00332c",
    },
    "& .MuiClockPointer-root": {
      backgroundColor: "#00332c",
    },
    "& .MuiButtonBase-root:focus": {
      backgroundColor: "#00332c",
    },
    "& .MuiClock-pmButton:focus": {
      backgroundColor: "#fa857d",
    },
    "& .MuiClock-amButton:focus": {
      backgroundColor: "#fa857d",
    },

    "& .Mui-disabled": {
      display: "none",
    },
  };

  return (
    <>
      <Navbar2></Navbar2>
      <div className="search">
        <div className="searchContainer">
          <div className="searchDateTimeContainer">
            <div className="dateTimePicker">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  className="muiDateTimePicker"
                  minDate={
                    new Date(
                      new Date().toLocaleString("en-US", {
                        timeZone: "Asia/Brunei",
                      })
                    )
                  }
                  minutesStep={30}
                  minTime={new Date(0, 0, 0, 9)}
                  maxTime={new Date(0, 0, 0, 21)}
                  ampm={false}
                  // disableIgnoringDatePartForTimeValidation={true}
                  disablePast
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      // sx={{
                      //   svg: { color },
                      //   input: { color },
                      //   label: { color },
                      // }}
                    />
                  )}
                  label="Pick-up Date & Time"
                  value={deliveryDate}
                  onChange={(newValue) => {
                    setShowSearchResult(false);
                    newValue.setMinutes(0);
                    //adjust return date if needed
                    if (newValue.getTime() >= returnDate.getTime()) {
                      setReturnDate(
                        new Date(newValue.getTime() + dayInMillisecond)
                      );
                    }
                    setDeliveryDate(newValue);
                  }}
                  PopperProps={{
                    sx: popperSx,
                  }}
                  showDaysOutsideCurrentMonth
                />
              </LocalizationProvider>
              <BsArrowRight
                className="rightArrow"
                style={{ fontSize: "65px" }}
              ></BsArrowRight>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  className="muiDateTimePicker"
                  minDate={new Date()}
                  minutesStep={30}
                  minTime={new Date(0, 0, 0, 9)}
                  maxTime={new Date(0, 0, 0, 21)}
                  renderInput={(props) => <TextField {...props} />}
                  label="Drop-off Date & Time"
                  value={returnDate}
                  onChange={(newValue) => {
                    setShowSearchResult(false);
                    newValue.setSeconds(0);
                    setReturnDate(newValue);
                    if (newValue.getTime() <= deliveryDate.getTime()) {
                      let newDeliveryDate = new Date(
                        newValue.getTime() - dayInMillisecond
                      );
                      setDeliveryDate(newDeliveryDate);
                    }
                  }}
                />
              </LocalizationProvider>
            </div>
            <br />
            <h5>Duration</h5>
            <p>{duration} Day(s)</p>
            <br />
            <button className="searchBtn" onClick={() => handleSearch()}>
              Search
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
              {loading ? (
                <div className="loaderContainer">
                  <FadeLoader
                    color="#00332C"
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <div className="searchResults">
                  {filteredGroup.map((motorGroup, i) => {
                    return (
                      <SearchOption
                        key={i}
                        motorGroup={motorGroup}
                        days={duration}
                        deliveryDateInMillisecond={deliveryDate.getTime()}
                        returnDateInMillisecond={returnDate.getTime()}
                        isAvailable={motorGroup.isAvailable}
                      ></SearchOption>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchV2;
