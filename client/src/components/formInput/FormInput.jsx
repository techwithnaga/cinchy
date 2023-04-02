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
import InputAdornment from "@mui/material/InputAdornment";
import { BsCalendar3 } from "react-icons/bs";

const FormInput = (props) => {
  const { id, label, type, menuitems, handleChange, name, value } = props;

  let component = <></>;

  if (type === "textField") {
    component = (
      <TextField
        id={id}
        label={label}
        onChange={handleChange}
        name={name}
        InputProps={{
          sx: {
            "& input": {
              textAlign: "center",
            },
          },
        }}
      />
    );
  } else if (type === "number") {
    component = (
      <TextField
        id={id}
        label={label}
        onChange={handleChange}
        name={name}
        type="number"
        InputProps={{
          sx: {
            "& input": {
              textAlign: "center",
            },
          },
        }}
      />
    );
  } else if (type === "select") {
    component = (
      <FormControl fullWidth>
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
      </FormControl>
    );
  } else if (type === "date") {
    component = (
      <div className="component">
        <p className="label">{label}</p>
        <input
          type={type}
          placeholder={label}
          name={name}
          id={id}
          onChange={handleChange}
        ></input>
      </div>
    );
  }
  return <div className="formInput">{component}</div>;
};

export default FormInput;
