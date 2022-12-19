import React, { useContext, useState } from "react";
import BikeOption from "../../components/bikeOption/BikeOption";
import { useNavigate } from "react-router-dom";
import "./searchOption.css";
import ModalError from "../../components/modalError/ModalError";
import { SearchContext } from "../../context/SearchContext";

const SearchOption = ({ motorGroup, days, deliveryDate, returnDate }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const [showError, setShowError] = useState(false);
  const closeModal = () => {
    setShowError(false);
  };
  const handleSearchBookNowClick = (motorGroupId) => {
    if (days === 0) {
      setShowError(true);
    } else {
      dispatch({
        type: "NEW_SEARCH",
        payload: { motorGroupId, days, deliveryDate, returnDate },
      });
      navigate("/login");
    }
  };
  return (
    <div className="searchOption">
      <BikeOption
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
      <ModalError
        closeModal={closeModal}
        showError={showError}
        errorMessage="Please select pick-up and drop-off dates."
      ></ModalError>
    </div>
  );
};

export default SearchOption;
