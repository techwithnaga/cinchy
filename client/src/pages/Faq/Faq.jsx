import React from "react";
import "./Faq.css";
import Navbar2 from "../../components/navbar2/Navbar2";

const Faq = () => {
  const data = [
    {
      id: 1,
      question: "Which payment methods do you accept?",
      answer:
        "You can pay with any debit/credit card - Visa, Mastercard, Maestro, Amex, Discover, Diners, JCB, Unionpay. We use Stripe to process payments, so do not store your card details and never share this information with third parties. ApplePay and GooglePay are also supported.",
    },
    {
      id: 2,
      question: "What do I need to rent a motorbike?",
      answer:
        "To book your motorbike/scooter, all you need is a credit or debit card. When you pick the motorbike up, you'll need: proof of reservation, your passport/ID, valid driving license, debit or credit card.",
    },
    {
      id: 3,
      question: "What happen if I damage the motorbike?",
      answer:
        "In most occasions the maximum you might be charged is the security deposit. If you included Premium Insurance with your booking, then your security deposit will be protected. When you pickup up your rental, our local rental partner will explain the procedure to follow and emergency contact details in the event of an accident - your safety always comes first.",
    },
    {
      id: 4,
      question: "Are all fees included in the rental price?",
      answer:
        "Yes. The vast majority of our rentals include basic insurance, local taxes and any road fees. You have the option to add 'extras' (ie. One-Way rental, GPS, GoPro, etc) but we'll clearly list any additional costs involved before you book your motorbike/scooter.",
    },
  ];

  return (
    <div className="faq" id="faq">
      <Navbar2></Navbar2>

      <div className="faqContainer">
        <h2>Frequently Asked Questions</h2>
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
      </div>
    </div>
  );
};

export default Faq;
