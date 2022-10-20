import React from "react";
import BikeOption from "../../components/bikeOption/BikeOption";
import { useNavigate } from "react-router-dom";
import "./searchOption.css";

const SearchOption = () => {
  const navigate = useNavigate();
  const handleSearchBookNowClick = () => {
    navigate("/login");
  };
  return (
    <div className="searchOption">
      <BikeOption></BikeOption>
      <div className="searchOptionInfo">
        <div className="searchOptionInfoTxt">
          <h5>
            IDR 160K/<label> days</label>
          </h5>
          <h5>
            IDR 800K/<label> 7days</label>
          </h5>
        </div>
        <button
          className="searchOptionBookBtn"
          onClick={handleSearchBookNowClick}
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default SearchOption;
