import React, { useContext } from "react";
import "./login.css";
import Navbar2 from "../../components/navbar2/Navbar2";
import Phonenumber from "../../components/phonenumber/Phonenumber";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  // const { user } = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("user : " + user.username);
  //   if (user) {
  //     navigate("/information");
  //   }
  // });

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
