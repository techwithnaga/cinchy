import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";
import axios from "axios";

const AdminLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://masbeegrace.cyclic.app/api/auth/login",
        {
          username: userName,
          password: password,
        }
      );

      //console.log(res.data.token);
      await sessionStorage.setItem("token", res.data.token);

      navigate("/adminDashboard");
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {}, [error]);

  return (
    <div className="adminLogin">
      <div className="adminLoginContainer">
        {error && <p style={{ color: "red" }}>Wrong username or password!</p>}
        <br />
        <div className="adminLoginForm">
          <div className="adminFormItem">
            <p>Username :</p>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="adminFormItem">
            <p>Password :</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="adminLoginBtn" onClick={(e) => handleClick(e)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
