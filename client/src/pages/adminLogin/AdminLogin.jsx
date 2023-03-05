import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

const AdminLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/auth/login`,
        {
          username: userName,
          password: password,
        }
      );

      //console.log(res.data.token);
      await sessionStorage.setItem("token", res.data.token);
      setLoading(false);
      navigate("/adminDashboard");
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {}, [error]);

  return (
    <div className="adminLogin">
      {loading ? (
        <div className="loaderContainer">
          <FadeLoader
            color="#00332C"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="adminLoginContainer">
          {error && <p style={{ color: "red" }}>Wrong username or password!</p>}
          <br />
          <div className="adminLoginForm">
            <div className="adminFormItem">
              <p>Username :</p>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
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
      )}
    </div>
  );
};

export default AdminLogin;
