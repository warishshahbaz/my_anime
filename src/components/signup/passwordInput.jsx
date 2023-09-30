import { InputAdornment, IconButton, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FiLock } from "react-icons/fi";

/**
 *
 * @param {boolean} props.hideStartIcon to hide lock icon
 * @param {boolean} props.allowPaste to allow paste
 * @returns InputPassword
 */
const PasswordInput = ({ hideStartIcon, allowPaste, ...other }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...other}
      type={showPassword ? "text" : "password"}
      onPaste={(e) => {
        if (allowPaste) return;
        e.preventDefault();
      }}
      InputProps={{
        startAdornment: hideStartIcon ? null : (
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
              {showPassword ? <Visibility /> : <VisibilityOff />}
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

export default PasswordInput;
