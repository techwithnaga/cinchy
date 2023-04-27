import React from "react";
import AdminNavbar from "../../../../components/adminNavbar/AdminNavbar";
import AdminSidebar from "../../../../components/adminSidebar/AdminSidebar";
import "./bookings.scss";

const Bookings = () => {
  return (
    <div className="bookings">
      <div className="bookingsContainer">
        <AdminNavbar />
        <div className="body">
          <AdminSidebar />
          <div className="container">
            <p>Bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
