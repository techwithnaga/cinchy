import React, { useContext, useState } from "react";
import BikeOption from "../../components/bikeOption/BikeOption";
import { useNavigate } from "react-router-dom";
import "./searchOption.css";
import ModalError from "../../components/modalError/ModalError";
import { SearchContext } from "../../context/SearchContext";

const SearchOption = ({
  motorGroup,
  days,
  deliveryDateInMillisecond,
  returnDateInMillisecond,
  isAvailable,
}) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    setShowError(false);
  };

  const handleSearchBookNowClick = (motorGroupId, priceperday) => {
    //check valid delivery date
    let now = moment();

    console.log(now);

    if (days === 0 || deliveryDateInMillisecond >= returnDateInMillisecond) {
      setErrorMessage("Please select valid delivery and return dates.");
      setShowError(true);
    } else if (
      deliveryDateInMillisecond <=
      new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Brunei" })
      ).getTime()
    ) {
      setErrorMessage("Invalid delivery time.");
      setShowError(true);
    } else if (days > 30) {
      setErrorMessage("Unable to book more than 30 days.");
      setShowError(true);
    } else {
      let subtotal = days * priceperday;
      dispatch({
        type: "NEW_SEARCH",
        payload: {
          motorGroupId,
          subtotal,
          deliveryDateInMillisecond,
          returnDateInMillisecond,
        },
      });
      //check if the user has log in
      const isLoggedIn = sessionStorage.getItem("token");

      if (isLoggedIn) {
        navigate("/information");
      } else {
        navigate("/login", { state: { fromPage: "search" } });
      }
    }
  };
  return (
    <div className={isAvailable ? "searchOption" : "searchOption"}>
      {!isAvailable && <div className="bookedGreyCover"></div>}
      <BikeOption
        groupName={motorGroup.groupName}
        category={motorGroup.category}
        description={motorGroup.description}
        photos={motorGroup.photos}
      ></BikeOption>
      <div className="searchOptionInfo">
        <div className="searchOptionInfoTxt">
          <h6>
            IDR {motorGroup.price}K/<label> day</label>
          </h6>
        </div>
        <button
          className="searchOptionBookBtn"
          onClick={() =>
            handleSearchBookNowClick(motorGroup._id, motorGroup.price)
          }
          disabled={!isAvailable}
        >
          BOOK NOW
        </button>
      </div>
      <ModalError
        closeModal={closeModal}
        showError={showError}
        errorMessage={errorMessage}
      ></ModalError>
    </div>
  );
};

export default SearchOption;
