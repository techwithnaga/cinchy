import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const Accordian = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="accordian">
      <div className="accordianQuestion">
        <h5 className="questionTxt">{question}</h5>
        {showAnswer ? (
          <MdOutlineKeyboardArrowUp
            className="accordianArrowdown"
            onClick={() => setShowAnswer(!showAnswer)}
          ></MdOutlineKeyboardArrowUp>
        ) : (
          <MdOutlineKeyboardArrowDown
            className="accordianArrowdown"
            onClick={() => setShowAnswer(!showAnswer)}
          ></MdOutlineKeyboardArrowDown>
        )}
      </div>
      <div className="accordianAnswer">{showAnswer && <p>{answer}</p>}</div>
    </div>
  );
};

export default Accordian;
