import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./feedback.css";

const Feedback = () => {
  const [success, setSuccess] = useState(false);
  const [params, setParams] = useState({
    to_name: "naga & grace",
    firstName: "",
    lastName: "",
    emailAddress: "",
    numberofpeople: 1,
    comment: "",
  });

  const sendEmail = () => {
    emailjs
      .send("masbeegrace", "masbeegrace-template", params, "C8V7M-Us8IHcCRyL_")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          setSuccess(true);
        },
        function (err) {
          console.log("FAILED...", err);
        }
      );
  };

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };
  return (
    <div className="rsvp" id="rsvp">
      <h2>RSVP</h2>
      {success ? (
        <div className="rsvpSuccess">
          <h3>
            Success! We have received your rsvp. Thank you. I will see you in
            bali!
          </h3>
        </div>
      ) : (
        <>
          <div className="rsvpContainer">
            <div className="rsvpName">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="firstName"
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="lastName"
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              placeholder="Email"
              name="emailAddress"
              onChange={handleChange}
            />
            <select type="text" onChange={handleChange} name="numberofpeople">
              <option value="1" disabled>
                How many people will come with you?
              </option>
              <option value="1">Only me!</option>
              <option value="2">I have a partner</option>
            </select>
            <textarea
              name="comment"
              placeholder="Additional Comments"
              rows="5"
              onChange={handleChange}
            />
          </div>
          <button className="rsvpBtn" onClick={() => sendEmail()}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default Feedback;
