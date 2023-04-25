import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import FormInput from "../../components/formInput/FormInput";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./createPromoCode.scss";
import axios from "axios";
import { es } from "date-fns/locale";
import { ConstructionOutlined, TempleHinduSharp } from "@mui/icons-material";
import { FadeLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
// import format from "date-fns/format";

const CreatePromoCode = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  const [values, setValues] = useState({
    code: "",
    motorGroup: "",
    type: "",
    amount: 0,
    maximum: 0,
    activeStartDate: "",
    activeEndDate: "",
    bookingStartDate: "",
    bookingEndDate: "",
  });

  const [errorMessages, setErrorMessages] = useState({});

  let inputs = [
    {
      id: "1",
      type: "textField",
      label: "Promo Code",
      name: "code",
      errorMessage: errorMessages.code,
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
      errorMessage: errorMessages.amount,
    },
    {
      id: "5",
      type: "number",
      label: "Maximum number of codes",
      name: "maximum",
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

  const handleDateChange = (name, newDate) => {
    setValues({ ...values, [name]: newDate });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async () => {
  //   await axios
  //     .post(`${process.env.REACT_APP_API_ENDPOINT}/api/promoCode`, values)
  //     .then(() => {
  //       navigate(-1);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const validate = () => {
    let temp = {};

    //check code
    if (values.code.length < 3 || values.code.length > 20) {
      temp.code = "Promo code should be 3-20 characters!";
    } else if (/[@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(values.code)) {
      temp.code = "Promo code should not contain any special characters!";
    }

    //code duplicate
    state.rows.forEach((row) => {
      if (row.code === values.code) {
        temp.code = "promo code has been used! please select another code.";
      }
    });

    //check motorgroup
    if (values.motorGroup === "") {
      temp.motorGroup = "Please select a motor Group!";
    }

    //check type
    if (values.type === "") {
      temp.type = "Please select a promo type!";
    }

    //check amount
    //1 is Flat-Total, 2 is Flat-Daily, 3 is Discount
    if (values.amount <= 0) {
      temp.amount = "The amount can't be zero or a negative number!";
    } else {
      if (values.type === 1 && values.amount > 150) {
        temp.amount = "The amount can't be greater than 150!";
      } else if (values.type === 2 && values.amount > 50) {
        temp.amount = "The amount can't be greater than 50!";
      } else {
        if (values.type === 3 && (values.amount < 0 || values.amount > 50)) {
          temp.amount = "The amount must be between 0 and 50!";
        }
      }
    }

    //check maximum
    if (values.maximum <= 0) {
      temp.maximum =
        "The maximum number of codes can't be zero or a negative number!";
    }

    //check active start dates
    if (!values.activeStartDate) {
      temp.activeStartDate = "Active Start date is required!";
    }

    //check active end date
    if (!values.activeEndDate) {
      temp.activeEndDate = "Active End date is required!";
    } else if (
      new Date(values.activeEndDate).getTime() <
      new Date(values.activeStartDate).getTime()
    ) {
      temp.activeEndDate = "End date must be after start date!";
    }

    //check booking start dates
    if (!values.bookingStartDate) {
      temp.bookingStartDate = "Booking start date is required!";
    } else if (
      new Date(values.bookingStartDate).getTime() <
      new Date(values.activeStartDate).getTime()
    ) {
      temp.bookingStartDate =
        "Booking start date must be the same or after active start date!";
    }

    //check booking end dates
    if (!values.bookingEndDate) {
      temp.bookingEndDate = "Booking end date is required!";
    } else if (
      new Date(values.bookingEndDate).getTime() <
      new Date(values.bookingStartDate).getTime()
    ) {
      temp.activeEndDate = "End date must be after start date!";
    } else if (
      new Date(values.bookingEndDate).getTime() <
      new Date(values.activeEndDate).getTime()
    ) {
      temp.bookingEndDate =
        "Booking end date must be the same or after active end date! ";
    }

    setErrorMessages({ ...temp });

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validate()) {
      await axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/api/promoCode`, values)
        .then(() => {
          navigate(-1);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="single">
      <AdminNavbar />
      <div className="singleContainer">
        <div className="body">
          <AdminSidebar />
          {loading ? (
            <div className="loaderContainer">
              <FadeLoader
                color="#00332C"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div className="container">
              <h3 className="title">Create Promo Code </h3>
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
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePromoCode;
