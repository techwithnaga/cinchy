import React from "react";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import "./promoCodes.scss";
import format from "date-fns/format";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "code", headerName: "Code", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      let isActive = true;

      if (
        params.row.used >= params.row.maximum ||
        new Date().getTime() < new Date(params.row.startDate).getTime() ||
        new Date().getTime() > new Date(params.row.endDate).getTime()
      ) {
        isActive = false;
      }

      return <p>{isActive ? "Active" : "Not Active"}</p>;
    },
  },
  {
    field: "activeStartDate",
    headerName: "Active SD",
    width: 130,
    renderCell: (params) => {
      return (
        <p>{format(new Date(params.row.activeStartDate), "dd MMM yyyy")}</p>
      );
    },
  },
  {
    field: "activeEndDate",
    headerName: "Active ED",
    width: 130,
    renderCell: (params) => {
      return <p>{format(new Date(params.row.activeEndDate), "dd MMM yyyy")}</p>;
    },
  },
  { field: "motorGroup", headerName: "Motor group", width: 100 },
  {
    field: "type",
    headerName: "Type",
    width: 130,
    renderCell: (params) => {
      return <p>{params.row.type === 1 ? "Flat" : "Percent"}</p>;
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    renderCell: (params) => {
      return (
        <p>
          {params.row.type === 1
            ? params.row.amount + ",000 IDR"
            : params.row.amount + " %"}
        </p>
      );
    },
  },
  { field: "maximum", headerName: "Maximum", type: "number", width: 80 },
  { field: "used", headerName: "Used", type: "number", width: 80 },
  {
    field: "bookingStartDate",
    headerName: "Booking SD",
    width: 130,
    renderCell: (params) => {
      return (
        <p>{format(new Date(params.row.bookingStartDate), "dd MMM yyyy")}</p>
      );
    },
  },
  {
    field: "bookingEndDate",
    headerName: "Booking ED",
    width: 130,
    renderCell: (params) => {
      return (
        <p>{format(new Date(params.row.bookingEndDate), "dd MMM yyyy")}</p>
      );
    },
  },

  {
    field: "action",
    action: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <Button variant="outlined" size="small" color="warning">
          <Link
            to="/admin-dashboard/edit-promocode"
            style={{ textDecoration: "none", color: "var(--color-green700)" }}
            state={{ data: params.row }}
          >
            <EditIcon style={{ fontSize: "15px", marginRight: "5px" }} />
            Edit
          </Link>
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
  let rows = data.map((item, index) => ({ id: index + 1, ...item }));
  let selectedRows = [];

  const handleDelete = async () => {
    let selectedTableIds = selectedRows.map((row) => {
      return row._id;
    });

    await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/promoCode`, {
      data: { ids: selectedTableIds },
    });
    reFetch();
  };

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
                  onClick={() => navigate("/admin-dashboard/create-promocode")}
                >
                  <AddIcon />
                  Create
                </Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                  <DeleteIcon className="icon" />
                  Delete
                </Button>
              </div>
            </div>
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={rows}
                onRowSelectionModelChange={(ids) => {
                  let selectedIdsSet = new Set(ids);
                  selectedRows = rows.filter((row) =>
                    selectedIdsSet.has(row.id)
                  );
                }}
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
