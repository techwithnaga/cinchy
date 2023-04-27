import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
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
// import moment from "moment-timezone";
import { Button, Stack, TextField, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

const BookingSummary = () => {
  const { state } = useLocation();
  const [showError, setShowError] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(true);
  const [agreeToTNC, setAgreeToTNC] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [showPromoMessage, setShowPromoMessage] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");
  const [isPromoError, setIsPromoError] = useState(true);
  const [isInstagram, setIsInstagram] = useState(false);
  // const [percentDiscount, setPercentDiscount] = useState(25);

  const {
    motorGroupId,
    subtotal,
    UTCDeliveryDateTimeInString,
    UTCReturnDateTimeInString,
    localDeliveryDateTimeInMs,
    localReturnDateTimeInMs,
    UTCDeliveryDateTimeInMs,
    UTCReturnDateTimeInMs,
    rentalDuration,
  } = useContext(SearchContext);

  const closeModalError = () => {
    setShowError(false);
  };
  const navigate = useNavigate();
  const [newBooking, setNewBooking] = useState(state.newBooking);
  const [discountType, setDiscountType] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalRentalPrice, setTotalRentalPrice] = useState(0);

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

  const [loading2, setLoading2] = useState(false);
  const d = new Date();

  const handleConfirmClick = async () => {
    newBooking.promoCode = promoCode;
    newBooking.discount = totalDiscount;
    newBooking.totalRentalPrice = totalRentalPrice;

    if (agreeToTNC) {
      setLoading2(true);

      let createdBooking = {};
      await axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/api/booking`, newBooking)
        .then(async (res) => {
          createdBooking = res;
          // newBooking._id = createdBooking._id;

          await axios.put(
            `${process.env.REACT_APP_API_ENDPOINT}/api/motorGroup/updatetime/${newBooking.motorGroup}`,
            {
              bookingId: res.data._id,
              startTime: UTCDeliveryDateTimeInMs,
              endTime: UTCReturnDateTimeInMs,
            }
          );
        });

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
            deliveryDate: format(localDeliveryDateTimeInMs, "E, d MMM HH:mm"),
            deliveryLocation: delivery.data.region,
            returnDate: format(localReturnDateTimeInMs, "E, d MMM HH:mm"),
            returnLocation: pickup.data.region,
          }
        )
        .then(() => {
          setLoading2(false);
          navigate("/bookingconfirmation", {
            state: {
              bookingInfo: createdBooking.data,
              motorGroup: data,
              // deliveryDate: format(localDeliveryDateTimeInMs, "E, d MMM HH:mm"),
              // returnDate: format(localDeliveryDateTimeInMs, "E, d MMM HH:mm"),
            },
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

  //Handle Promo Code Change
  const handlePromoCode = (e) => {
    setIsDisabled(false);
    setPromoCode(e.target.value);
    setShowPromoMessage(false);
  };

  //handle promo code apply
  const handlePromoApply = async () => {
    setIsInstagram(false);
    await axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/promocode/checkpromocode`,
        {
          code: promoCode,
          motorGroup: data.category.toLowerCase(),
          deliveryTime: UTCDeliveryDateTimeInMs,
        }
      )
      .then((res) => {
        setDiscountType(res.data.type);
        setDiscountAmount(res.data.amount);
        setPromoMessage("Success! Promo code has been applied.");
        setShowPromoMessage(true);
        setIsPromoError(false);
        // calculateDiscount();
      })
      .catch((err) => {
        setPromoMessage("Invalid promo code.");
        // setPromoCode("");
        setTotalDiscount(0);
        setShowPromoMessage(true);
        setIsPromoError(true);
      });
  };

  const DiscountTxt = () => {
    let numberOfDays = Math.ceil(
      (localReturnDateTimeInMs - localDeliveryDateTimeInMs) / 86400000
    );

    //1 is Flat-Total, 2 is Flat-Daily, 3 is Discount
    if (discountType === 1) {
      setTotalDiscount(discountAmount);
    } else if (discountType === 2) {
      setTotalDiscount(numberOfDays * discountAmount);
    } else if (discountType === 3) {
      setTotalDiscount((discountAmount / 100) * newBooking.subtotal);
    }

    let totalRentalPrice =
      newBooking.subtotal - totalDiscount + newBooking.deliveryPickupFee;
    newBooking.totalRentalPrice = totalRentalPrice;
    newBooking.discount = totalDiscount;

    return (
      <>
        <div className="paymentSummaryItem">
          <label htmlFor="subtotal">
            Discount {isPromoError ? "" : `(${promoCode} Promo)`}
          </label>
          <p>(IDR {formatNumber(totalDiscount)}K)</p>
        </div>

        <div className="paymentSummaryItem">
          <h5 htmlFor="subtotal">Total Payment</h5>
          <h4>IDR {formatNumber(totalRentalPrice)}K</h4>
        </div>
      </>
    );
  };

  const InstagramPromo = () => {
    return (
      <>
        <div className="paymentSummaryItem">
          <label htmlFor="subtotal">
            Discount {isPromoError ? "" : `(${promoCode} Promo)`}
          </label>
          <p>(IDR {formatNumber(totalDiscount)}K)</p>
        </div>

        <div className="paymentSummaryItem">
          <h5 htmlFor="subtotal">Total Payment</h5>
          <h4>IDR {formatNumber(totalRentalPrice)}K</h4>
        </div>
      </>
    );
  };

  // const calculateDiscount = () => {
  //   let numberOfDays = Math.ceil(
  //     (localReturnDateTimeInMs - localDeliveryDateTimeInMs) / 86400000
  //   );

  //   let discount = 0;

  //   //1 is Flat-Total, 2 is Flat-Daily, 3 is Discount
  //   if (discountType === 1) {
  //     // setTotalDiscount(discountAmount);
  //     discount = discountAmount;
  //   } else if (discountType === 2) {
  //     // setTotalDiscount(numberOfDays * discountAmount);
  //     discount = numberOfDays * discountAmount;
  //   } else if (discountType === 3) {
  //     // setTotalDiscount((discountAmount / 100) * newBooking.subtotal);
  //     discount = (discountAmount / 100) * newBooking.subtotal;
  //   }

  //   let total =
  //     newBooking.subtotal - totalDiscount + newBooking.deliveryPickupFee;
  //   newBooking.totalRentalPrice = totalRentalPrice;
  //   newBooking.discount = totalDiscount;

  //   setTotalRentalPrice(total);
  //   setTotalDiscount(discount);
  // };

  // const handleInstaClick = async () => {
  //   setPromoCode("CINCHYIG");
  //   // await handlePromoApply();
  //   setTotalDiscount(30);
  //   setIsPromoError(false);
  //   setShowPromoMessage(false);
  // };

  useEffect(() => {}, [
    promoCode,
    agreeToMarketing,
    totalDiscount,
    totalRentalPrice,
    isInstagram,
  ]);

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
                  {format(
                    new Date(localDeliveryDateTimeInMs),
                    "E, d MMM HH:mm"
                  )}
                  -{format(new Date(localReturnDateTimeInMs), "E, d MMM HH:mm")}
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
                    {/* <div className="paymentSummaryItem">
                      <label htmlFor="subtotal">Soft Opening Promo </label>
                      <p>(IDR {formatNumber(rentalDuration * 20)}K)</p>
                    </div> */}

                    {/* <div className="paymentSummaryItem">
                      <label htmlFor="subtotal">
                        Discount {isPromoError ? "" : `(${promoCode} Promo)`}
                      </label>
                      <p>(IDR {formatNumber(totalDiscount)}K)</p>
                    </div>

                    <div className="paymentSummaryItem">
                      <h5 htmlFor="subtotal">Total Payment</h5>
                      <h4>IDR {formatNumber(totalRentalPrice)}K</h4>
                    </div> */}

                    {isInstagram ? <InstagramPromo /> : <DiscountTxt />}
                    {/* <DiscountTxt></DiscountTxt> */}
                  </div>
                  <hr />

                  <div className="promoCode">
                    <Stack direction="row" spacing={3} mt={3}>
                      <TextField
                        id="promoCodeInput"
                        label="Promo Code"
                        variant="outlined"
                        value={promoCode}
                        onChange={(e) => {
                          handlePromoCode(e);
                          setShowPromoMessage(false);
                          setIsPromoError(true);
                        }}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: 150 }}
                        disabled={isDisabled}
                        onClick={() => handlePromoApply()}
                      >
                        Apply
                      </Button>
                    </Stack>

                    {showPromoMessage && (
                      <label style={{ color: isPromoError ? "red" : "green" }}>
                        {promoMessage}
                      </label>
                    )}
                  </div>

                  <br></br>
                  <br></br>

                  <div className="socialMedialItem">
                    <span>Follow us on</span>
                    <span
                      onClick={() => {
                        // setTotalDiscount(newBooking.subtotal / 4);
                        // console.log(totalDiscount);
                        // setDiscountAmount(0.25 * newBooking.subtotal);
                        // setShowPromoMessage(false);
                        // setPromoCode("CINCHYIG");
                        // setIsPromoError(false);
                        // setTotalDiscount(newBooking.subtotal * 0.25);
                        // handlePromoApply();
                        // handleInstaClick();
                        setPromoCode("CINCHYIG");
                        setTotalDiscount(rentalDuration * 20);
                        setTotalRentalPrice(
                          newBooking.subtotal -
                            rentalDuration * 20 +
                            newBooking.deliveryPickupFee
                        );
                        setIsInstagram(true);
                      }}
                      className="instagram"
                    >
                      <InstagramIcon
                        style={{ fontSize: "14px" }}
                      ></InstagramIcon>
                      <a
                        href="https://www.instagram.com/cinchy.life/"
                        target="_blank"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        instagram
                      </a>
                    </span>
                    <span>for more discount</span>
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
                    className="marketingCheckbox"
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
