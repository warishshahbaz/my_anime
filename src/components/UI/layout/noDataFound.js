import { Box, Typography } from "@mui/material";
import React from "react";
import { LiaInboxSolid } from "react-icons/lia";

function NoData() {
  return (
    <>
      <Box
        sx={{
          color: "gray",
          border: "1px solid gray",
          width: "300px",
          height: "300px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "22px",
        }}
      >
        <LiaInboxSolid color="gray" size={92} />

        <Typography>No Data</Typography>
      </Box>
    </>
  );
}

export default NoData;
