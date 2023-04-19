import React from "react";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import "./adminDashboard.scss";
const AdminDashboard = () => {
  return (
    <div className="adminDashboard">
      <div className="adminDashboardContainer">
        <AdminNavbar />

        <div className="body">
          <AdminSidebar />
          <div className="container"> Dashboard</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
