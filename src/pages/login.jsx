import { Alert, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import EmailInput from "../components/signup/emailInput";
import PasswordInput from "../components/signup/passwordInput";
import { HelperText } from "../components/signup/HelperText";
import Validator from "../utils/conversion/validator";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: { value: "", error: null },
    password: { value: "", error: null },
  });
  const [checkLocal, setCheckLocal] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  function checkIsValid(name, value) {
    if (name === "confirmPassword") {
      setIsValid(false);
      if (userCredentials.password.value === value) {
        setIsValid(true);
      }
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("signup"));

    if (!data.length > 0) {
      setCheckLocal(true);
    } else {
      setCheckLocal(false);
      const { email, password } = userCredentials;

      let res = data?.some(
        (val) =>
          val.email.value === email.value &&
          val.password.value === password.value
      );
      if (res) {
        navigate("/home");
      }
    }
    setTimeout(() => {
      setCheckLocal(false);
    }, 3000);
  };
  return (
    <>
      {checkLocal && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "300px",
            }}
          >
            <Alert onClose={() => setCheckLocal(false)} severity="error">
              You need to ceate account
            </Alert>
          </Box>
        </Box>
      )}
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
            {false && (
              <Box
                component="div"
                sx={{
                  textAlign: "center",
                  fontSize: "17px",
                  width: "100%",
                }}
              >
                <Typography variant="h5" sx={{ fontSize: "15px" }} color="red">
                  {/* {sentOtpStatus.error} */}
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
              Login In
            </Typography>
          </div>

          <Typography color="error" sx={{ fontSize: "0.8rem", color: "red" }}>
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

              <Button
                sx={{ marginTop: "12px" }}
                variant="contained"
                disabled={
                  userCredentials.email.error ||
                  !userCredentials.email.value ||
                  userCredentials.password.error ||
                  !userCredentials.password.value
                }
                fullWidth
                type="submit"
                onClick={handleSubmit}
                // loading={sentOtpStatus.loading}
                loadingText="Logging In..."
              >
                Log In
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
                color: "blue",
              }}
              // href={partner_link}
            >
              Don’t have an account?
              <Box
                component={"a"}
                sx={{
                  marginLeft: "6px",
                  color: "blue",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
                onClick={() => navigate("/signup")}
              >
                Create here
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
