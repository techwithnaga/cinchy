import React from "react";
import "./login.css";
import Navbar2 from "../../components/navbar2/Navbar2";
import Phonenumber from "../../components/phonenumber/Phonenumber";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <Navbar2></Navbar2>
      <div className="loginContainer">
        <Phonenumber></Phonenumber>
      </div>
    </div>
  );
};

export default Login;
