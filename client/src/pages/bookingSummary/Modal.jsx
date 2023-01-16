import React, { useState } from "react";
import "./modal.css";
import { IoClose } from "react-icons/io5";

const Modal = ({ isModalOpen, closeModal, agreeToTNC, setAgreeToTNC }) => {
  // const handleAgreeClick = () => {
  //   setHasAgreed(true);
  //   closeModal();
  // };

  const handleTNCClick = () => {
    setAgreeToTNC(!agreeToTNC);
    closeModal();
  };

  return (
    <div className={`${isModalOpen ? "modal showModal " : "modal"}`}>
      <div className="modalContainer">
        <div className="modalHeader">
          <h4>Our rental terms and conditions</h4>
          {/* <button onClick={closeModal} className="modalCloseBtn">
            Done
          </button> */}
          <IoClose
            onClick={closeModal}
            style={{ fontSize: "150%", cursor: "pointer" }}
          ></IoClose>
        </div>
        <br />

        <h5>Driver’s Responsibility</h5>
        <ul>
          <li>
            Renter needs to provide Cinchy a copy of items below with the same
            name with booking at maximum of 48 hours before delivery. Our staff
            will contact you via your provided contact number to verify the
            items. Failure to do so will result in booking cancellation.
          </li>
          <ul>
            <li>Valid ID</li>
            <li>Valid Driving License</li>
            <li>Round Trip Flight Ticket</li>
            <li>Hotel Booking for the trip duration </li>
          </ul>
          <li>
            Your safety is our priority. Our staff will assess the renter’s
            riding capability during pick up. If deemed unsafe, your booking is
            subject to a full refund cancellation.
          </li>
          <li>
            Cinchy is not liable to any damage, loss, injury, or death sustained
            by the renters or any party involved during the renting period.{" "}
          </li>
          <li>
            Renter is liable for all penalties and fines incurred during the
            rental period.{" "}
          </li>
        </ul>
        <br />
        <h5>Delivery and Return</h5>
        <ul>
          <li>
            Renter must provide delivery and return location 48 hours before
            delivery and return time. Our staff will contact you via your
            provided contact number to verify the location. Failure to do so may
            be subject to cancellation.
          </li>
          <li>
            During delivery, the renter must provide an original copy of their
            ID as a deposit during the rental period.
          </li>
          <li>
            Vehicle must be returned on time. Late return may result in extra
            charge.
          </li>
          <li>
            Cinchy is not liable for any loss, damage, delay, or failure to
            perform resulting from any event beyond reasonable control,
            including, but not limited to: acts or omissions of any governmental
            agency, third party, or User; fire, earthquake, or other acts of
            God; war, civil disobedience, or sabotage; other criminal acts;
            Internet, telecommunications, or equipment failure; or power
            failure.
          </li>
        </ul>

        <h5>Driver’s Responsibility</h5>
        <ul>
          <li>
            Renter needs to provide Cinchy a copy of items below with the same
            name with booking at maximum of 48 hours before delivery. Our staff
            will contact you via your provided contact number to verify the
            items. Failure to do so will result in booking cancellation.
          </li>
          <ul>
            <li>Valid ID</li>
            <li>Valid Driving License</li>
            <li>Round Trip Flight Ticket</li>
            <li>Hotel Booking for the trip duration </li>
          </ul>
          <li>
            Your safety is our priority. Our staff will assess the renter’s
            riding capability during pick up. If deemed unsafe, your booking is
            subject to a full refund cancellation.
          </li>
          <li>
            Cinchy is not liable to any damage, loss, injury, or death sustained
            by the renters or any party involved during the renting period.{" "}
          </li>
          <li>
            Renter is liable for all penalties and fines incurred during the
            rental period.{" "}
          </li>
        </ul>
        <br />
        <h5>Payment & Cancellation</h5>
        <ul>
          <li>
            Free cancellation if made no later than 24 hours before scheduled
            delivery time.
          </li>
          <li>
            Cinchy currently only accepts local currency (IDR) via cash OR local
            bank transfer. Cards and international payments are coming in the
            near future. Cinchy will ask you to provide the proof of bank
            transfer.
          </li>
        </ul>
        <br />
        <h5>Damages & Additional Charges</h5>
        <ul>
          <li>Renter agrees to notify Cinchy immediately of any accidents.</li>
          <li>
            Renter agrees to return the vehicle in the same condition you
            received it, ordinary wear and tear excepted. If damage occurs,
            renter will be notified by email or phone for the cost of repairs
            from the damage. The damage includes, but not limited to: tire, body
            panel, phone holder, wheels, helmet, remote/keys, and vehicle’s
            accessories.
          </li>
          <li>
            If you return later, you may also be charged a late return fee every
            24 hours.
          </li>
        </ul>
        <br />
        <h5>Cinchy Bali</h5>
        <ul>
          <li>No refunds or credits for unused rental days.</li>
          <li>Vehicles are not allowed to be used outside Bali province.</li>
          <li>
            Road assistants only cover delivery areas. After hours may incur
            additional fee.
          </li>
          <li>
            Copies of the vehicle's paperworks are provided in the vehicle’s
            storage.
          </li>
        </ul>
        {/* <button onClick={() => handleAgreeClick()} className="modalCloseBtn">
          I agree with the above terms, conditions, and privacy policy
        </button> */}
        <div className="agreeToTNC">
          <div className="agreeToTNCContainer">
            <input
              type="checkbox"
              className="checkbox"
              checked={agreeToTNC}
              onChange={handleTNCClick}
            />
            <label style={{ textAlign: "left" }}>
              I agree with the above terms, conditions, and privacy policy.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
