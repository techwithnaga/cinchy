import React, { useState } from "react";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import FormInput from "../../components/formInput/FormInput";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "./editPromoCode.scss";
import axios from "axios";

const EditPromoCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;

  console.log(data);

  // const [values, setValues] = useState({
  //   id: data._id,
  //   code: data.code,
  //   motorGroup: data.motorGroup,
  //   type: data.type,
  //   amount: data.amount,
  //   maximum: data.maximum,
  //   startDate: data.startDate,
  //   endDate: data.endDate,
  // });

  const [values, setValues] = useState({
    id: data._id,
    code: data.code,
    motorGroup: data.motorGroup,
    type: data.type,
    amount: data.amount,
    maximum: data.maximum,
    activeStartDate: data.activeStartDate,
    activeEndDate: data.activeEndDate,
    bookingStartDate: data.bookingStartDate,
    bookingEndDate: data.bookingEndDate,
  });

  const [errorMessages, setErrorMessages] = useState({});

  let inputs = [
    {
      id: "1",
      type: "textField",
      label: "Promo Code",
      name: "code",
      errorMessage: errorMessages.code,
      value: values.code,
      pattern: "john",
    },
    {
      id: "2",
      type: "select",
      label: "Motor Group",
      name: "motorGroup",
      value: values.motorGroup,
      menuitems: [
        { key: 1, value: "all", text: "All Motors" },
        { key: 2, value: "comfort", text: "Comfort" },
        { key: 3, value: "compact", text: "Compact" },
        { key: 4, value: "style", text: "Style" },
      ],
      errorMessage: errorMessages.motorGroup,
    },
    {
      id: "3",
      type: "select",
      label: "Promo Type",
      name: "type",
      value: values.type,
      menuitems: [
        { key: 1, value: 1, text: "Flat-Total" },
        { key: 2, value: 2, text: "Flat-Daily" },
        { key: 3, value: 3, text: "Percent" },
      ],
      errorMessage: errorMessages.type,
    },
    {
      id: "4",
      type: "number",
      label: "Amount (in thousands of rupiah or percentage)",
      name: "amount",
      value: values.amount,
      errorMessage: errorMessages.amount,
    },
    {
      id: "5",
      type: "number",
      label: "Maximum number of codes",
      name: "maximum",
      value: values.maximum,
      errorMessage: errorMessages.maximum,
    },
    {
      id: "6",
      type: "date",
      label: "Active Start Date",
      name: "activeStartDate",
      value: values.activeStartDate,
      errorMessage: errorMessages.activeStartDate,
    },
    {
      id: "7",
      type: "date",
      label: "Active End Date",
      name: "activeEndDate",
      value: values.activeEndDate,
      errorMessage: errorMessages.activeEndDate,
    },
    {
      id: "8",
      type: "date",
      label: "Booking Start Date",
      name: "bookingStartDate",
      value: values.bookingStartDate,
      errorMessage: errorMessages.bookingStartDate,
    },
    {
      id: "9",
      type: "date",
      label: "Booking End Date",
      name: "bookingEndDate",
      value: values.bookingEndDate,
      errorMessage: errorMessages.bookingEndDate,
    },
  ];

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, newValue) => {
    setValues({ ...values, [name]: newValue });
  };

  const handleSubmit = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API_ENDPOINT}/api/promoCode/${values.id}`,
        values
      )
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="single">
      <AdminNavbar />
      <div className="singleContainer">
        <div className="body">
          <AdminSidebar />
          <div className="container">
            <h3 className="title">Edit Promo Code </h3>
            <form action="">
              {inputs.map((input) => {
                return (
                  <FormInput
                    key={input.id}
                    {...input}
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                  />
                );
              })}

              <Button
                variant="outlined"
                className="submitBtn"
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPromoCode;
