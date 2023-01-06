import React from "react";
import "./FAQs.css";
import Accordian from "./Accordian.jsx";
import images from "../../pictures/picture";

const FAQs = () => {
  const data = [
    {
      id: 1,
      question: "Which payment methods do you accept?",
      answer:
        "At the moment we only accept Cash on Delivery, or local bank transfer. In the future, you can pay with any debit/credit card - Visa, Mastercard, Amex, Discover & Diners, JCB, Unionpay. We use Stripe to process payments, so do not store your card details and never share this information with third parties. Stay tuned!",
    },
    {
      id: 2,
      question: "Where can I pick up the bike? Can you deliver?",
      answer:
        "At Cinchy, we deliver the motorbike at your convenience. You just need to choose your delivery and return location; Cinchy covers most urban areas. Just make sure to provide the location’s detail during the booking.",
    },
    {
      id: 3,
      question: "What happen if I damage the motorbike?",
      answer:
        "You are liable for the damages happened during rental. Our staff will explain the procedure to follow and emergency contact details in the event of an accident - your safety always comes first. *Cinchy is working to provide insurance to your rental. Stay tuned!",
    },
    {
      id: 4,
      question: "Are all fees included in the rental price?",
      answer: "Yes. we say NO to hidden fees! 🙂",
    },
  ];

  return (
    <div className="faqs" id="faqs">
      <h2>FAQs</h2>
      <img src={images.vespa} alt="" className="vespaMerah" />
      <div className="faqsContainer">
        <div className="accordians">
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
    </div>
  );
};

export default FAQs;
