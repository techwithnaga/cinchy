import React from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import "./search.css";
import SearchOption from "./SearchOption";

const Search = () => {
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
                <input type="text" />
              </div>
              <div className="searchDateTimeItem">
                <p>Time</p>
                <input type="text" />
              </div>
            </div>
            <br />
            <h5>Drop-Off</h5>
            <div className="searchDateTime">
              <div className="searchDateTimeItem">
                <p>Date</p>
                <input type="text" />
              </div>
              <div className="searchDateTimeItem">
                <p>Time</p>
                <input type="text" />
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
