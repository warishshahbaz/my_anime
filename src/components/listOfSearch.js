import * as React from "react";
import { Box } from "@mui/material";
import Error from "./UI/layout/error";

const styles = {
  width: "100%",
  maxWidth: 350,
  bgcolor: "background.paper",
  // zIndex: 99999,
  display: "flex",
  borderBottom: "1px solid gray",
  cursor: "pointer",
  padding: "3px",
  gap: 1,
  ":hover": {
    bgcolor: "#ede7f6",
    zIndex: 99999,
  },
  "::-webkit-scrollbar": {
    display: "none",
  },
};

export default function AlignItemsList({
  searchData,
  handleToDetail,
  searchInput,
}) {
  return (
    <Box
      component={"ul"}
      sx={{
        maxHeight: "250px",
        overflowY: "auto",
        position: "absolute",
        width: "170px",
        top: "42px",
        zIndex: 99999,
      }}
    >
      {searchData.error ? (
        <Error text="Network error" />
      ) : searchData.data.length > 0 ? (
        searchData.data.map((val) => {
          return (
            <Box
              component={"li"}
              sx={styles}
              onClick={() => handleToDetail(val)}
            >
              <Box
                component={"img"}
                sx={{ width: "30px", height: "30px", borderRadius: "50%" }}
                src={val.images.jpg.image_url}
              />
              <Box component={"span"} sx={{ fontSize: "12px" }}>
                {val.title.length > 16
                  ? `${val.title.slice(0, 16)}...`
                  : val.title}
              </Box>
            </Box>
          );
        })
      ) : searchInput.value.length > 0 ? (
        <Box
          sx={{
            textAlign: "center",
            bgcolor: "background.paper",
          }}
          component={"div"}
        >
          No data found
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}
