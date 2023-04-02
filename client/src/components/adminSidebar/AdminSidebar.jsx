import React from "react";
import "./adminSidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DiscountIcon from "@mui/icons-material/Discount";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import AdminPanelSettingsSharpIcon from "@mui/icons-material/AdminPanelSettingsSharp";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MopedOutlinedIcon from "@mui/icons-material/MopedOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="adminSidebar">
      <div className="adminSidebarContainer">
        <ul>
          <p className="title">MAIN</p>
          <li className="item">
            <DashboardIcon className="icon" />
            Dashboard
          </li>
        </ul>
        <ul>
          <p className="title">PROMO</p>
          <li
            className="item"
            onClick={() => {
              navigate("/admin-dashboard/promocodes");
            }}
          >
            <DiscountIcon className="icon" />
            Promo Codes
          </li>
          <li className="item">
            <QueryStatsIcon className="icon" />
            Stats
          </li>
        </ul>
        <ul>
          <p className="title">LISTS</p>
          <li className="item">
            <BookOutlinedIcon className="icon" />
            Bookings
          </li>
          <li className="item">
            <AdminPanelSettingsSharpIcon className="icon" />
            Admins
          </li>
          <li className="item">
            <GroupOutlinedIcon className="icon" />
            Users
          </li>
          <li className="item">
            <MopedOutlinedIcon className="icon" />
            Motors
          </li>
          <li className="item">
            <NewspaperOutlinedIcon className="icon" />
            Blogs
          </li>
        </ul>
        <ul>
          <p className="title">SERVICE</p>
          <li className="item">
            <PriceCheckOutlinedIcon className="icon" />
            Check-In
          </li>
          <li className="item">
            <ShoppingCartCheckoutOutlinedIcon className="icon" />
            Check-Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
