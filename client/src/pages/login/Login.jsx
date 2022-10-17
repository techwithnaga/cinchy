import React from "react";
import "./login.css";
import Navbar2 from "../../components/navbar2/Navbar2";
import Phonenumber from "../../components/phonenumber/Phonenumber";

const Login = () => {
  return (
    <div className="login">
      <Navbar2></Navbar2>
      <Phonenumber></Phonenumber>
    </div>
  );
};

export default Login;
