import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import PasswordInput from "../components/signup/passwordInput";
import { red } from "@mui/material/colors";
import ConfirmPasswordInput from "../components/signup/confirmPass";
import Validator from "../utils/conversion/validator";
import { BsTelephone } from "react-icons/bs";
import { HelperText } from "../components/signup/HelperText";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RiRefreshLine } from "react-icons/ri";
import { BiError } from "react-icons/bi";
import EmailInput from "../components/signup/emailInput";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: { value: "", error: null },
    password: { value: "", error: null },
    confirmPassword: { value: "", error: null },
    phone: { value: "", error: null },
  });
  const [data, setData] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState({
    loading: false,
    error: false,
    data: "",
  });
  const [signUpStatus, setSignUpStatus] = useState({
    error: false,
    errMsg: "",
  });
  const navigate = useNavigate();
  const theme = useTheme();

  function checkIsValid(name, value) {
    if (name === "confirmPassword") {
      setIsValid(false);
      if (userCredentials.password.value === value) {
        setIsValid(true);
      }
    }
  }
  function handleInputChange(e) {
    const { value, name } = e.target;

    const validity = checkValidation(name, value);
    if (name === "confirmPassword") {
      checkIsValid(name, value);
    }

    setUserCredentials((prevValue) => ({
      ...prevValue,
      [name]: { value, error: validity },
    }));
  }

  function checkValidation(type, value) {
    const validate = new Validator(value);
    if (type === "email") {
      return !validate.email();
    }
    if (type === "password") {
      return !validate.password();
    }
    if (type === "confirmPassword") {
      return !validate.password();
    }

    if (type === "phone") {
      return !validate.mobile();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, userCredentials]);
    let localData = JSON.parse(localStorage.getItem("signup"));
    if (!localData.length > 0) {
      setSignUpStatus({
        error: true,
        errMsg: "Registration failed ",
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("signup", JSON.stringify(data));
    let localData = JSON.parse(localStorage.getItem("signup"));
    if (localData.length > 0) {
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            marginLeft: "50px",
            maxWidth: "25rem",
            width: "100%",
            padding: "20px",
            minHeight: "30rem",
            backgroundColor: "rgba(255, 255, 255, 1)",
            boxShadow: "0 10px 100px #dddddd",
            borderRadius: "15px",
            "& @media screen and (max-width: 720px)": {
              marginLeft: "0px",
              maxWidth: "100%",
              width: "100%",
              padding: "20px",
              minHeight: "inherit",
              backgroundColor: "transparent",
              boxShadow: "none",
              borderRadius: "15px",
            },
          }}
        >
          <div>
            {signUpStatus.error && (
              <Box
                component="div"
                sx={{
                  textAlign: "center",
                  fontSize: "17px",
                  width: "100%",
                }}
              >
                <Typography variant="h5" sx={{ fontSize: "15px" }} color="red">
                  {signUpStatus.errMsg}
                </Typography>
              </Box>
            )}
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: "24px",
              }}
            >
              Create an Account
            </Typography>
          </div>

          <Typography
            color="error"
            sx={{ fontSize: "0.8rem", color: `${red[500]}!important` }}
          >
            {/* {apiError.msg} */}
          </Typography>

          <Box sx={{ width: "100%", padding: "7px" }}>
            <form onSubmit={handleSubmit}>
              <EmailInput
                fullWidth
                margin="normal"
                label="Email"
                id="login-email"
                name="email"
                onChange={handleInputChange}
                placeholder=""
              />

              <PasswordInput
                fullWidth
                margin="normal"
                id="login-password"
                label="Password"
                name="password"
                variant="outlined"
                value={userCredentials.password.value}
                onChange={handleInputChange}
                error={userCredentials.password.error}
                helperText={
                  userCredentials.password.error ? (
                    <>
                      <HelperText
                        errMsg="Please enter valid password:"
                        details={[
                          "• Minimum 8 character",
                          " • Atleast 1 uppercase",
                          "• Atleast 1 lowercase",
                          "• Atleast 1 number",
                          "• Atleast 1 special character (Eg: !,@,#,$,%,^,&,*)",
                        ]}
                      />
                    </>
                  ) : (
                    ""
                  )
                }
              />
              <ConfirmPasswordInput
                fullWidth
                margin="normal"
                id="login-confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                variant="outlined"
                value={userCredentials.confirmPassword.value}
                onChange={handleInputChange}
                error={!isValid}
                helperText={
                  !isValid ? (
                    <>
                      <Box
                        component="ul"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Box component="li" sx={{ mr: "10px" }}>
                          Please enter valid password:
                        </Box>
                      </Box>
                    </>
                  ) : (
                    ""
                  )
                }
              />
              <TextField
                fullWidth
                id="outlined-basic"
                margin="normal"
                error={userCredentials.phone.error}
                value={userCredentials.phone.value}
                name="phone"
                onChange={handleInputChange}
                required
                label="Mobile"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BsTelephone />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        {phoneVerified.loading && <RiRefreshLine />}
                        {phoneVerified.error && (
                          <Tooltip title={phoneVerified.error}>
                            <Box component="span">
                              <BiError color="red" />
                            </Box>
                          </Tooltip>
                        )}
                        {phoneVerified.data && !phoneVerified.loading && (
                          <AiOutlineCheckCircle color="green" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={
                  userCredentials.phone.error ? (
                    <HelperText
                      errMsg="Invalid mobile no"
                      details={[
                        "Mobile number should be 10 digit",
                        " Number should be start with 6,7,8 and 9",
                      ]}
                    />
                  ) : (
                    ""
                  )
                }
              />

              <Button
                sx={{ marginTop: "12px" }}
                variant="contained"
                disabled={
                  userCredentials.email.error ||
                  !userCredentials.email.value ||
                  userCredentials.password.error ||
                  !userCredentials.password.value ||
                  userCredentials.phone.error ||
                  !userCredentials.phone.value ||
                  userCredentials.confirmPassword.error ||
                  !userCredentials.confirmPassword.value
                }
                fullWidth
                type="submit"
                onClick={handleSubmit}
                // loading={sentOtpStatus.loading}
                loadingText="Logging In..."
              >
                Sign Up
              </Button>
            </form>
            <Box
              component={"div"}
              sx={{
                width: "100%",
                marginTop: "5px",
                fontSize: "12px",

                fontWeight: "500",
                textAlign: "center",
                color: theme.palette.grey[500],
              }}
            >
              Already have an account?
              <Box
                component={"a"}
                sx={{
                  marginLeft: "6px",
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
                onClick={() => navigate("/")}
              >
                Login here
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
