import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./feedback.css";

const Feedback = () => {
  const [success, setSuccess] = useState(false);
  const [messagefocused, setMessageFocused] = useState(false);
  const [emailfocused, setEmailFocused] = useState(false);
  const [params, setParams] = useState({
    from_name: "Cinchy",
    emailAddress: "",
    request: "",
  });

  const handleMessageFocus = (e) => {
    setMessageFocused(true);
  };

  const handleEmailFocus = (e) => {
    setEmailFocused(true);
  };

  const sendEmail = () => {
    if (params.emailAddress && params.request) {
      emailjs
        .send("cinchy", "cinchy-template", params, "C8V7M-Us8IHcCRyL_")
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
            setSuccess(true);
          },
          function (err) {
            console.log("FAILED...", err);
          }
        );
    }
  };

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };
  return (
    <div className="rsvp" id="rsvp">
      <h2>WE HEAR YOU!</h2>

      {success ? (
        <div className="rsvpSuccess">
          <h3>Success! We have received your feedback. Thank you.</h3>
        </div>
      ) : (
        <>
          <div className="rsvpContainer">
            <p>
              Cinchy is dedicated to making continuous improvements, and we love
              your feedback. What other features should we add to smoothen your
              journey in Bali? Comment below and leave your email if you would
              like to be part of Cinchy’s buddies 🙂 Promise we won’t spam.
            </p>
            <div className="rsvpItem">
              <h6>Message</h6>
              <br />
              <textarea
                name="request"
                type="textarea"
                placeholder="e.g. I’d love to have a credit card payment"
                onChange={handleChange}
                required
                onBlur={handleMessageFocus}
                focused={messagefocused.toString()}
                rows="5"
              />
              <span>
                Please enter your message. We would like to hear from you!
              </span>
            </div>
            <div className="rsvpItem">
              <h6>email (optional)</h6>
              <br />
              <input
                type="email"
                placeholder="youremail@gmail.com"
                name="emailAddress"
                onChange={handleChange}
                onBlur={handleEmailFocus}
                focused={emailfocused.toString()}
                required
              />
              <span>Please enter a valid email</span>
            </div>
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
