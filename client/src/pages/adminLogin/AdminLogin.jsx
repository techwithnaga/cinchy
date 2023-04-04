import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import { AuthContext } from "../../context/AuthContext";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { user, loading, error, dispatch } = useContext(AuthContext);

  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_API_ENDPOINT}/api/auth/login`,
  //       {
  //         username: userName,
  //         password: password,
  //       }
  //     );

  //     await sessionStorage.setItem("token", res.data.token);
  //     setLoading(false);
  //     navigate("/adminDashboard");
  //   } catch (err) {
  //     console.log(err);
  //     setError(true);
  //     setLoading(false);
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/auth/login`,
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(user);
      navigate("/adminDashboard");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "wrong username or password",
      });
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
          {error && <span style={{ color: "red" }}>{error.message}</span>}
          <br />
          <div className="adminLoginForm">
            <div className="adminFormItem">
              <p>Username :</p>
              <input type="text" id="username" onChange={handleChange} />
            </div>
            <div className="adminFormItem">
              <p>Password :</p>
              <input id="password" type="password" onChange={handleChange} />
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
