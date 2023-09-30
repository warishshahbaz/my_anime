import { InputAdornment, IconButton, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { FiLock } from "react-icons/fi";

const ConfirmPasswordInput = (props) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      onPaste={(e) => {
        e.preventDefault();
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FiLock />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
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
};

export default ConfirmPasswordInput;
