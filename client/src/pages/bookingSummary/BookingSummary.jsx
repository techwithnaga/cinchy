import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import ProgressBar from "../../components/progressBar/ProgressBar";
import "./bookingSummary.css";
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BsInfoCircleFill } from "react-icons/bs";
import { format } from "date-fns";
import ModalError from "../../components/modalError/ModalError";
import axios from "axios";
import formatNumber from "../../utils/formatNumber";
import FadeLoader from "react-spinners/FadeLoader";

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
    `${process.env.REACT_APP_API_ENDPOINT}/api/motorGroup/${newBooking.motorGroup}`,
    "get"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  // const [hasAgreed, setHasAgreed] = useState(false);

  const [loading2, setLoading2] = useState(false);

  const handleConfirmClick = async () => {
    if (agreeToTNC) {
      setLoading2(true);
      let st = newBooking.deliveryDate;
      let et = newBooking.returnDate;

      //create new booking
      const createdBooking = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/booking`,
        newBooking
      );

      //update motorgroup
      const mg = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/api/motorGroup/updatetime/${newBooking.motorGroup}`,
        {
          bookingId: createdBooking._id,
          startTime: st,
          endTime: et,
        }
      );

      //update agreeTo Marketing
      const updatedUser = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/api/user/${newBooking.user}`,
        {
          agreeMarketing: agreeToMarketing,
        }
      );

      //send confirmation to user
      // const user = await axios.get(
      //   `http://localhost:8800/api/user/${newBooking.user}`
      // );

      //send confirmation to user
      const delivery = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/deliveryFee/${newBooking.deliveryLocation}`
      );

      const pickup = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/deliveryFee/${newBooking.returnLocation}`
      );

      await axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/api/booking/sendbookingconfirmation`,
          {
            firstName: updatedUser.data.firstName,
            phoneNumber: updatedUser.data.whatsappNumber,
            reservationNumber: createdBooking.data._id.slice(-5),
            groupName: data.groupName,
            deliveryDate: format(
              new Date(newBooking.deliveryDate),
              "E, d MMM HH:mm"
            ),
            deliveryLocation: delivery.data.region,
            returnDate: format(
              new Date(newBooking.returnDate),
              "E, d MMM HH:mm"
            ),
            returnLocation: pickup.data.region,
          }
        )
        .then(() => {
          setLoading2(false);
          navigate("/bookingconfirmation", {
            state: { bookingInfo: createdBooking.data, motorGroup: data },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowError(true);
    }
  };

  const handleMarketingClick = () => {
    setAgreeToMarketing(!agreeToMarketing);
  };

  useEffect(() => {
    // setLoading2(true);
    // setTimeout(() => {
    //   setLoading2(false);
    // }, 5000);
  }, [agreeToMarketing]);

  return (
    <div className="bookingConfirmation">
      <Navbar2></Navbar2>
      <br />
      <ProgressBar step={3}></ProgressBar>
      <br />
      <h3>Booking Summary</h3>
      <div className="bookingConfirmationContainer">
        {loading2 ? (
          <div className="loaderContainer">
            <FadeLoader
              color="#00332C"
              loading={loading2}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div>
            <div className="bookingConfirmationContent">
              <div className="motorInfo">{}</div>

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
                  {format(new Date(newBooking.deliveryDate), "E, d MMM HH:mm")}{" "}
                  -{format(new Date(newBooking.returnDate), "E, d MMM HH:mm")}
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
                    className="checkbox"
                    checked={agreeToMarketing}
                    onChange={handleMarketingClick}
                  />
                  <label style={{ textAlign: "left" }}>
                    Opt in to marketing and newsletter emails. No spam,
                    promised!
                  </label>
                </div>
                <button className="TNCBtn" onClick={() => openModal()}>
                  Read All Terms & Conditions
                  <span style={{ color: "red" }}>*</span>
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
        )}
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
