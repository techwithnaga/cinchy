import React from "react";
import AdminNavbar from "../../../../components/adminNavbar/AdminNavbar";
import AdminSidebar from "../../../../components/adminSidebar/AdminSidebar";
import "./motors.scss";

const Motors = () => {
  return (
    <div className="motors">
      <div className="motorsContainer">
        <AdminNavbar />
        <div className="body">
          <AdminSidebar />
          <div className="container">
            <p>Motors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motors;
