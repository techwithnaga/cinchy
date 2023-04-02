import React from "react";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import "./promoCodes.scss";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "code", headerName: "Code", width: 100 },
  { field: "motorGroup", headerName: "Motor group", width: 130 },
  { field: "type", headerName: "Type", width: 130 },
  { field: "amount", headerName: "Amount", width: 100 },
  { field: "maximum", headerName: "Maximum", type: "number", width: 80 },
  { field: "used", headerName: "Used", type: "number", width: 80 },
  { field: "startDate", headerName: "Start date", width: 130 },
  { field: "endDate", headerName: "End date", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
  {
    field: "action",
    action: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <Button variant="outlined" size="small" color="warning">
          <EditIcon style={{ fontSize: "15px", marginRight: "5px" }} />
          Edit
        </Button>
      );
    },
  },
];

const PromoCodes = () => {
  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_API_ENDPOINT}/api/promoCode`,
    "get"
  );

  const navigate = useNavigate();

  return (
    <div className="promoCodes">
      <div className="promoCodesContainer">
        <AdminNavbar />
        <div className="body">
          <AdminSidebar />
          <div className="container">
            <div className="top">
              <h3 className="title ">Promo Codes</h3>
              <div className="buttons">
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() =>
                    navigate("/admin-dashboard/createedit", {
                      state: {
                        title: "Create Promo Codes",
                      },
                    })
                  }
                >
                  <AddIcon />
                  Create
                </Button>
                <Button variant="outlined" color="error">
                  <DeleteIcon className="icon" />
                  Delete
                </Button>
              </div>
            </div>
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={data.map((item, index) => ({ id: index + 1, ...item }))}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodes;
