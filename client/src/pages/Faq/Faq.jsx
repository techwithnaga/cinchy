import React from "react";
import "./Faq.css";
import Navbar2 from "../../components/navbar2/Navbar2";

const Faq = () => {
  const data = [
    {
      id: 1,
      question: "Where can I pick up the bike? Can you deliver?",
      answer:
        "At Cinchy, we deliver the motorbike at your convenience. You just need to choose your delivery and return location; Cinchy covers most urban areas. Just make sure to provide the location’s detail during the booking.",
    },
    {
      id: 2,
      question:
        "I carry a luggage. Do you provide Airport Transfer to my hotel or villa?",
      answer:
        "If you have big and heavy luggage (7kg-30kg), it will be best to prebook the transport service from your accomodation. However, if you carry a backpack, you can still pick up and ride the scooter from the Airport. Just follow the map below. *Cinchy is working to provide Airport transfer by car. Stay tuned!",
    },
    {
      id: 3,
      question: "What happen if I damage the motorbike?",
      answer:
        "You are liable for the damages happened during rental. Our staff will explain the procedure to follow and emergency contact details in the event of an accident - your safety always comes first. *Cinchy is working to provide insurance to your rental. Stay tuned!",
    },
    {
      id: 4,
      question: "Which payment methods do you accept?",
      answer:
        "At the moment we only accept Cash on Delivery, or local bank transfer. In the future, you can pay with any debit/credit card - Visa, Mastercard, Amex, Discover & Diners, JCB, Unionpay. We use Stripe to process payments, so do not store your card details and never share this information with third parties. Stay tuned!",
    },
    {
      id: 5,
      question: "Are all fees included in the rental price?",
      answer: "Yes. we say NO to hidden fees! 🙂",
    },
  ];

  return (
    <div className="faq" id="faq">
      <Navbar2></Navbar2>

      <div className="faqContainer">
        <h2>Frequently Asked Questions</h2>
        <br />
        <div className="faqItems">
          {data.map((item) => {
            return (
              <div className="faqItem" key={item.id}>
                <div className="faqQuestion">
                  <h5 className="questionTxt">{item.question}</h5>
                </div>
                <div className="faqAnswer">
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
        <br />
        <br />
        <img
          className="faqMap"
          src="https://cinchy.s3.ap-southeast-1.amazonaws.com/cinchy_BALI_airport_guide.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Faq;
