import { Box, Typography } from "@mui/material";
import React from "react";
import { BiError } from "react-icons/bi";

function Error({ text }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "200px",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BiError color="red" size={32} />
        <Typography sx={{ color: "red", fontSize: "16px" }}>{text}</Typography>
      </Box>
    </Box>
  );
}

export default Error;
