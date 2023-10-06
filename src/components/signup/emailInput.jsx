import { InputAdornment, TextField, useTheme } from "@mui/material";

import { useState } from "react";
import { FiMail } from "react-icons/fi";

import { HelperText } from "./HelperText";
import Validator from "../../utils/validator";

function EmailInput(props) {
  const [valid, setValidity] = useState(true);

  const theme = useTheme();

  function handleChange(e) {
    setValidity(true);
    const { value } = e.target;
    const isValid = new Validator(value).newEmail();
    setValidity(isValid);

    if (props.onChange) {
      props.onChange(e, isValid);
    }
  }

  return (
    <TextField
      placeholder="Enter your email"
      {...props}
      onChange={handleChange}
      type="email"
      error={!valid}
      helperText={
        !valid && (
          <HelperText
            errMsg={"please enter a valid email"}
            details={[
              "Domain should be either",
              "• com",
              "• in",
              "• co",
              "• org",
              "• net",
              "• us",
            ]}
          />
        )
      }
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FiMail />
          </InputAdornment>
        ),
      }}
      sx={{
        ".MuiFormHelperText-root.Mui-error": {
          color: `${theme.palette.error.main}!important`,
        },
      }}
    />
  );
}

export default EmailInput;
