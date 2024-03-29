import React, { useState } from "react";
import images from "../../pictures/picture";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";

import "./adminNavbar.scss";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className="adminNavbar">
      <div className="adminNavbarContainer">
        <div className="left">
          <img
            src={images.yellowGreenLogo}
            alt="yellowGreenLogo"
            onClick={() => navigate("/admin-dashboard")}
          />
        </div>

        <div className="right">
          <div className="item">
            <div className="adminNavbarSearch">
              <input type="text" placeholder="Search..." />
              <SearchOutlinedIcon />
            </div>
          </div>
          <div className="item">
            <DarkModeIcon></DarkModeIcon>
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon></NotificationsNoneOutlinedIcon>
          </div>
          <div className="item" onClick={() => setShowDropDown(!showDropDown)}>
            <img src={images.thumbnail} alt="thumbnail" />
          </div>
        </div>
      </div>

      {showDropDown && <DropDown className="dropDown"></DropDown>}
    </div>
  );
};

export default AdminNavbar;
