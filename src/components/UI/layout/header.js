import { Box } from "@mui/material";
import React from "react";
import logo from "../../../asserts/images/anime_logo.jpg";
import { useNavigate } from "react-router-dom";
import { GrFormSearch } from "react-icons/gr";

const Header = ({ handleChange, searchInput }) => {
  const Navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "70px",
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
          <Logo logo={logo} />
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "300px",
              position: "relative",
            }}
          >
            <Search handleChange={handleChange} searchInput={searchInput} />

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
function Logo({ logo }) {
  return (
    <Box
      component={"img"}
      height={60}
      width={60}
      src={logo}
      sx={{ borderRadius: "50%", marginTop: "2px" }}
      alt="logo"
    />
  );
}
function Search({ handleChange, searchInput }) {
  return (
    <>
      <Box sx={{ position: "absolute" }}>
        <GrFormSearch />
      </Box>

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
    </>
  );
}

export default Header;
