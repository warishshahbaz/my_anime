import { Box } from "@mui/material";
import React from "react";
import logo from "../../../asserts/images/logo.png";
import { useNavigate } from "react-router-dom";

const Header = ({ handleChange, searchInput }) => {
  const Navigate = useNavigate();
  // const handleChange = (e) => {
  //   const { value, name } = e.target;
  // };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "60px",
          alignItems: "center",
          boxShadow: "0px 0.2px 2px",
          margin: "0 auto",
          "@media (max-width:400px)": {
            boxShadow: "0px 0.4px 2px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            padding: " 0px 24px",
          }}
        >
          <Box
            component={"img"}
            height={40}
            width={70}
            src={logo}
            sx={{ borderRadius: "50%", marginTop: "12px" }}
            alt="logo"
          />
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "300px",
            }}
          >
            <Box
              component={"input"}
              placeholder="search..."
              onChange={handleChange}
              name="search"
              value={searchInput.value}
              aria-label="search"
              type="text"
              sx={{
                border: "1px solid gray",
                paddingLeft: "12px ",
                borderRadius: "12px",
                width: "150px",
              }}
            />

            <Box
              sx={{
                cursor: "pointer",
                ":hover": {
                  color: "bluevoilet",
                  fontWeight: "500",
                },
              }}
              onClick={() => Navigate("/")}
            >
              Log out
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
