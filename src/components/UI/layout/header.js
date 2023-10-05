import { Box } from "@mui/material";
import React from "react";
import logo from "../../../asserts/images/anime_logo.jpg";
import { useNavigate } from "react-router-dom";
import { GrFormSearch } from "react-icons/gr";
import AlignItemsList from "../../listOfSearch";

const Header = ({ handleChange, searchInput, searchData, handleToDetail }) => {
  const navigate = useNavigate();

  function logout() {
    localStorage.setItem("login", false);
    navigate("/");
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "70px",
          alignItems: "center",
          position: "sticky",
          top: "0px",
          left: "0px",
          backgroundColor: "white",
          boxShadow:
            "0 13px 25px -2px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)",
          transition: "all ease 200ms",
          margin: "0 auto",
          zIndex: 9999,

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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Search handleChange={handleChange} searchInput={searchInput} />
              <AlignItemsList
                searchData={searchData}
                handleToDetail={handleToDetail}
                searchInput={searchInput}
              />
            </Box>

            <Box
              sx={{
                cursor: "pointer",
                ":hover": {
                  color: "bluevoilet",
                  fontWeight: "500",
                },
              }}
              onClick={logout}
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
      <Box sx={{ position: "absolute", top: "6px", left: "126px" }}>
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
