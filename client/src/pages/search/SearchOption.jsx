import React, { useContext } from "react";
import BikeOption from "../../components/bikeOption/BikeOption";
import { useNavigate } from "react-router-dom";
import "./searchOption.css";
import { SearchContext } from "../../context/SearchContext";

const SearchOption = ({ motorGroup, days }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const handleSearchBookNowClick = (motorGroupId) => {
    dispatch({ type: "NEW_SEARCH", payload: { motorGroupId, days } });
    navigate("/login");
  };

  return (
    <div className="searchOption">
      <BikeOption
        key={motorGroup._id}
        groupName={motorGroup.groupName}
        category={motorGroup.category}
        description={motorGroup.description}
        photos={motorGroup.photos}
      ></BikeOption>
      <div className="searchOptionInfo">
        <div className="searchOptionInfoTxt">
          <br />
          <h6>
            IDR {motorGroup.price}K/<label> day</label>
          </h6>
        </div>
        <button
          className="searchOptionBookBtn"
          onClick={() => handleSearchBookNowClick(motorGroup._id)}
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default SearchOption;
