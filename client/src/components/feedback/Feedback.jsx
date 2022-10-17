import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./feedback.css";

const Feedback = () => {
  const [success, setSuccess] = useState(false);
  const [params, setParams] = useState({
    from_name: "Cinchy",
    emailAddress: "",
    request: "",
  });

  const sendEmail = () => {
    emailjs.send("cinchy", "cinchy-template", params, "C8V7M-Us8IHcCRyL_").then(
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
      <h2>WE HEAR YOU!</h2>

      {success ? (
        <div className="rsvpSuccess">
          <h3>Success! We have received your voice. Thank you.</h3>
        </div>
      ) : (
        <>
          <div className="rsvpContainer">
            <p>
              Cinchy is making continuous improvement and we love to hear what
              other features you think can help smoothen your journey in Bali?
              Comment below and leave your email if you would like to be part of
              Cinchy’s early buddies :) promise we won’t spam.
            </p>
            <div className="rsvpItem">
              <h6>Request</h6>
              <textarea
                name="request"
                placeholder="e.g. I'd love to have a credit card payment; do you offer"
                rows="5"
                onChange={handleChange}
              />
            </div>
            <div className="rsvpItem">
              <h6>email (optional)</h6>
              <input
                type="text"
                placeholder="youremail@gmail.com"
                name="emailAddress"
                onChange={handleChange}
              />
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
