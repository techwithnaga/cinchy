import React from "react";
import "./FAQs.css";
import Accordian from "./Accordian.jsx";

const FAQs = () => {
  const data = [
    {
      id: 1,
      question:
        "How do I get to the wedding venue? Will transportation be provided?",
      answer:
        "A shuttle will be provided to and from your ceremony to reception …venue(s), now's the time to share those details, including timing and pickup and drop-off locations.",
    },
    {
      id: 2,
      question: "What happens after the ceremony?",
      answer:
        "After the ceremony, the bridal party will be taking pictures nearby for around an hour. Guests can head straight to the Courtyard(reception hall) where we will be serving finger foods and beverages.",
    },
    {
      id: 3,
      question: "Can I bring my kids?",
      answer:
        "Due to [space/constraints or safety restrictions], we are unable to accommodate children at our wedding.",
    },
    {
      id: 4,
      question: "I have dietary restrictions/allergies.",
      answer: "Let us know under the RSVP comment section below.",
    },
  ];

  return (
    <div className="faqs" id="faqs">
      <h2>Frequently Asked Questions</h2>
      <div className="faqsContainer">
        {data.map((item) => {
          return (
            <Accordian
              key={item.id}
              question={item.question}
              answer={item.answer}
            ></Accordian>
          );
        })}
      </div>
    </div>
  );
};

export default FAQs;
