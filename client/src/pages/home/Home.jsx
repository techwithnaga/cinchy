import "./home.css";
import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Showcase from "../../components/showcase/Showcase.jsx";
import Feedback from "../../components/feedback/Feedback.jsx";
import FAQs from "../../components/FAQs/FAQs.jsx";
import Footer from "../../components/footer/Footer";
import MotorOptions from "../../components/motorOptions/MotorOptions";
import DeliveryLocations from "../../components/DeliveryLocations/DeliveryLocations";
import Miscellaneous from "../../components/miscellaneous/Miscellaneous";
import Comment from "../../components/comment/Comment";

const Home = () => {
  return (
    <div className="homePage">
      <Navbar></Navbar>
      <Showcase></Showcase>
      <MotorOptions></MotorOptions>
      <DeliveryLocations></DeliveryLocations>
      <Miscellaneous></Miscellaneous>
      <Comment></Comment>
      <FAQs></FAQs>
      <Feedback></Feedback>
      <Footer></Footer>
    </div>
  );
};

export default Home;
