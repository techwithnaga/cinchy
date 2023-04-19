import React from "react";
import "./formInput.scss";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import format from "date-fns/format";
import InputAdornment from "@mui/material/InputAdornment";
import { BsCalendar3 } from "react-icons/bs";
import FormHelperText from "@mui/material/FormHelperText";

const FormInput = (props) => {
  const {
    id,
    label,
    errorMessage = null,
    type,
    menuitems,
    handleChange,
    handleDateChange,
    name,
    value,
  } = props;

  let component = <></>;

  if (type === "textField") {
    component = (
      <>
        <TextField
          id={id}
          label={label}
          onChange={handleChange}
          name={name}
          value={value}
          InputProps={{
            sx: {
              "& input": {
                textAlign: "left",
              },
            },
          }}
          error={errorMessage ? true : false}
          helperText={errorMessage ? errorMessage : ""}
        />
      </>
    );
  } else if (type === "number") {
    component = (
      <TextField
        id={id}
        label={label}
        onChange={handleChange}
        name={name}
        type="number"
        value={value}
        error={errorMessage ? true : false}
        helperText={errorMessage ? errorMessage : ""}
        InputProps={{
          sx: {
            "& input": {
              textAlign: "left",
            },
          },
        }}
      />
    );
  } else if (type === "select") {
    component = (
      <FormControl fullWidth error={errorMessage ? true : false}>
        <InputLabel>{label}</InputLabel>
        <Select
          id={id}
          value={value}
          label={label}
          onChange={handleChange}
          name={name}
        >
          {menuitems?.map((item) => {
            return (
              <MenuItem key={item.key} value={item.value}>
                {item.text}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{errorMessage ? errorMessage : ""}</FormHelperText>
      </FormControl>
    );
  } else if (type === "date") {
    component = (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          value={value}
          inputFormat="dd MMM yyyy"
          // minDate={
          //   new Date(
          //     new Date().toLocaleString("en-US", {
          //       timeZone: "Asia/Brunei",
          //     })
          //   )
          // }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={errorMessage ? true : false}
              helperText={errorMessage ? errorMessage : ""}
              InputProps={{
                sx: {
                  "& input": {
                    textAlign: "left",
                  },
                },
              }}
              disabled
            />
          )}
          onChange={(newValue) => handleDateChange(name, newValue)}
          name={name}
        />
      </LocalizationProvider>
    );
  }
  return <div className="formInput">{component}</div>;
};

export default FormInput;
