import React, { useState } from "react";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import FormInput from "../../components/formInput/FormInput";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./createPromoCode.scss";
import axios from "axios";

const CreatePromoCode = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    code: "",
    motorGroup: "",
    type: 0,
    amount: 0,
    maximum: 0,
    startDate: "",
    endDate: "",
  });

  let inputs = [
    {
      id: 1,
      type: "textField",
      label: "Code",
      name: "code",
    },
    {
      id: 2,
      type: "select",
      label: "Motor Group",
      name: "motorGroup",
      value: values.motorGroup,
      menuitems: [
        { key: 1, value: "all", text: "All" },
        { key: 2, value: "comfort", text: "Comfort" },
        { key: 3, value: "compact", text: "Compact" },
        { key: 4, value: "style", text: "Style" },
      ],
    },
    {
      id: 3,
      type: "select",
      label: "Type",
      name: "type",
      value: values.type,
      menuitems: [
        { key: 1, value: 1, text: "Flat Discount" },
        { key: 2, value: 2, text: "Percent Discount" },
      ],
    },
    {
      id: 4,
      type: "number",
      label: "Amount",
      name: "amount",
    },
    {
      id: 5,
      type: "number",
      label: "Maximum",
      name: "maximum",
    },
    {
      id: 6,
      type: "date",
      label: "Start Date",
      name: "startDate",
      value: values.startDate,
    },
    {
      id: 7,
      type: "date",
      label: "End Date",
      name: "endDate",
      value: values.endDate,
    },
  ];

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/promoCode`, values)
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
            <h3 className="title">Create Promo Code </h3>
            <form action="">
              {inputs.map((input) => {
                return (
                  <FormInput
                    key={input.id}
                    {...input}
                    handleChange={handleChange}
                  />
                );
              })}

              <Button
                variant="outlined"
                className="submitBtn"
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePromoCode;
