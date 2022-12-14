import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import ProgressBar from "../../components/progressBar/ProgressBar";
import "./bookingSummary.css";
import images from "../../pictures/picture";
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BsInfoCircleFill } from "react-icons/bs";
import { format } from "date-fns";
import ModalError from "../../components/modalError/ModalError";
import axios from "axios";
import formatNumber from "../../utils/formatNumber";

const BookingSummary = () => {
  const { state } = useLocation();
  const [showError, setShowError] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(true);
  const [agreeToTNC, setAgreeToTNC] = useState(false);

  const closeModalError = () => {
    setShowError(false);
  };
  const navigate = useNavigate();

  const newBooking = state.newBooking;
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/motorGroup/${newBooking.motorGroup}`,
    "get"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const [hasAgreed, setHasAgreed] = useState(false);
  const handleConfirmClick = async () => {
    if (agreeToTNC) {
      let bookingId = newBooking._id;
      let st = newBooking.deliveryDate;
      let et = newBooking.returnDate;

      //create new booking
      let createdBooking = await axios
        .post("http://localhost:8800/api/booking", newBooking)
        .catch((err) => {
          console.log(err);
        });

      //update motorgroup
      await axios
        .put(
          `http://localhost:8800/api/motorGroup/updatetime/${newBooking.motorGroup}`,
          {
            bookingId: bookingId,
            startTime: st,
            endTime: et,
          }
        )
        .then(() => {
          navigate("/bookingconfirmation", {
            state: { bookingInfo: createdBooking.data, motorGroup: data },
          });
        })
        .catch((err) => console.log(err));
    } else {
      setShowError(true);
    }
  };

  const handleMarketingClick = () => {
    setAgreeToMarketing(!agreeToMarketing);
  };

  useEffect(() => {}, [agreeToMarketing]);

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
              <div className="paymentSummaryItems">
                <div className="paymentSummaryItem">
                  <label htmlFor="subtotal">Subtotal</label>
                  <p>IDR {formatNumber(newBooking.subtotal)}K</p>
                </div>
                <div className="paymentSummaryItem">
                  <label htmlFor="subtotal">Delivery Fee</label>
                  <p>IDR {formatNumber(newBooking.deliveryPickupFee)}K</p>
                </div>
                <div className="paymentSummaryItem">
                  <label htmlFor="subtotal">Accessories Fee</label>
                  <p>IDR 0</p>
                </div>
                <div className="paymentSummaryItem">
                  <label htmlFor="subtotal">
                    30% Discount (until 30 Jun 2023)
                  </label>
                  <p>(IDR {formatNumber(newBooking.discount)}K)</p>
                </div>
                <div className="paymentSummaryItem">
                  <h5 htmlFor="subtotal">Total Payment</h5>
                  <h4>IDR {formatNumber(newBooking.totalRentalPrice)}K</h4>
                </div>
              </div>

              {/* <div className="paymentTotal">
                <div className="paymentTotalText">
                  <h5>Total</h5>
                  <label>(Incl. Delivery Fee)</label>
                </div>

                <div className="paymentTotalRupiah">
                  <h4>IDR {newBooking.totalRentalPrice}K</h4>
                </div>
              </div> */}
            </div>
          </div>

          <div className="marketingAndTNC">
            <div className="bookingSummaryCancelation">
              <p>Free cancelation (24-hours notice)</p>
            </div>
            <div className="BookingConfirmationCheckBox">
              <input
                type="checkbox"
                class="checkbox"
                checked={agreeToMarketing}
                onClick={handleMarketingClick}
              />
              <label style={{ textAlign: "left" }}>
                Opt in to marketing and newsletter emails. No spam, promised!
              </label>
            </div>
            <button className="TNCBtn" onClick={() => openModal()}>
              Read All Terms & Conditions<span style={{ color: "red" }}>*</span>
            </button>
          </div>
        </div>

        <button
          className="bookingConfirmationConfirmBtn"
          onClick={() => handleConfirmClick()}
        >
          Confirm
        </button>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        agreeToTNC={agreeToTNC}
        setAgreeToTNC={setAgreeToTNC}
      ></Modal>
      {showError && (
        <ModalError
          closeModal={closeModalError}
          showError={showError}
          errorMessage="You must agree to rental terms and conditions before continue"
        ></ModalError>
      )}
    </div>
  );
};

export default BookingSummary;
