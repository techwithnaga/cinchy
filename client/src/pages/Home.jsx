import "./home.css";
import React from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import Showcase from "../components/showcase/Showcase.jsx";
import Feedback from "../components/feedback/Feedback.jsx";
import FAQs from "../components/FAQs/FAQs.jsx";

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Showcase></Showcase>
      <FAQs></FAQs>
      <Feedback></Feedback>
    </>
  );
};

export default Home;
