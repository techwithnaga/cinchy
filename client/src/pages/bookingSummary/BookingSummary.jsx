import React, { useState } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import ProgressBar from "../../components/progressBar/ProgressBar";
import BikeOption from "../../components/bikeOption/BikeOption";
import "./bookingSummary.css";
import images from "../../pictures/picture";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BsInfoCircleFill } from "react-icons/bs";
import { format } from "date-fns";

const BookingSummary = () => {
  const { state } = useLocation();
  const newBooking = state.newBooking;
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/motorGroup/${newBooking.motorGroup}`,
    "get"
  );
  console.log("total rental price :" + newBooking.totalRentalPrice);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bookingConfirmation">
      <Navbar2></Navbar2>
      <br />
      <ProgressBar step={3}></ProgressBar>
      <div className="bookingConfirmationContainer">
        <h3>Booking Summary</h3>
        <div className="bookingConfirmationContent">
          <div className="motorInfo">{}</div>

          {loading ? (
            <div>Loading</div>
          ) : (
            <div className="motorInfo">
              <div className="motorInfoHeader">
                <div className="motorInfoHeaderText">
                  <h6>{data.groupName}</h6>
                  <h6 style={{ color: "red" }}>{data.category}</h6>
                </div>
                <BsInfoCircleFill></BsInfoCircleFill>
              </div>

              <div className="motorPhotoDescription">
                <img src={data.photos} alt="" />
                <ul className="motorDescription">
                  {data.description?.map((des, i) => {
                    return (
                      <li className="motorDescriptionItem" key={i}>
                        {des}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            // <BikeOption
            //   groupName={data.groupName}
            //   category={data.category}
            //   description={data.description}
            //   photos={data.photos}
            // ></BikeOption>
          )}

          <div className="datePaymentSummary">
            <div className="bookingDate">
              {format(new Date(newBooking.deliveryDate), "E, d MMM HH:mm")} -
              {format(new Date(newBooking.returnDate), "E, d MMM HH:mm")}
            </div>
            <div className="paymentSummary">
              <br />
              <h4>Payment Summary</h4>
              <br />
              <div className="paymentTotal">
                <div className="payementTotalText">
                  <h5>Total</h5>
                  <label>(Incl. Delivery Fee)</label>
                </div>

                <div className="paymentTotalRupiah">
                  <h4>IDR {newBooking.totalRentalPrice}K</h4>
                </div>
              </div>
            </div>
            <div className="bookingSummaryCancelation">
              <p>Free cancelation (24-hours notice)</p>
            </div>
            <button className="learnMoreBtn" onClick={() => openModal()}>
              Read All Terms & Conditions<span style={{ color: "red" }}>*</span>
            </button>
          </div>
        </div>
        <h3>Confirmation</h3>
        <div className="bookingConfirmationFooter">
          <p style={{ color: "#90A3BF" }}>
            We are getting to the end. Just few clicks and your rental is ready!
          </p>
          <br />
          <div className="BookingConfirmationCheckBoxes">
            {/* <div className="BookingConfirmationCheckBox">
              <input type="checkbox" />
              <label>
                I agree with sending an Marketing and newsletter emails. No
                spam, promissed!
              </label>
            </div> */}
            <div className="BookingConfirmationCheckBox">
              <input type="checkbox" />
              <label>
                I agree with sending an Marketing and newsletter emails. No
                spam, promissed!
              </label>
            </div>
          </div>
        </div>
        <button className="bookingConfirmationConfirmBtn">Confirm</button>
        <div className="dataSecurity">
          <img src={images.secureIcon} alt="" />
          <h3>All your data are safe</h3>
          <p style={{ color: "#90A3BF" }}>
            We are using the most advanced security to provide you the best
            experience ever.
          </p>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal}></Modal>
    </div>
  );
};

export default BookingSummary;
