import React, { useContext } from "react";
import "./dropDown.scss";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DropDown = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/adminLogin");
  };
  return (
    <div className="dropDown">
      <ul>
        <li onClick={handleLogOut}>
          <ExitToAppOutlinedIcon className="icon"></ExitToAppOutlinedIcon>
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
