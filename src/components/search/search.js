import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchAnime({
  handleChange,
  searchInput,
  setSearchInput,
  handleToDetail,
  searchData,
}) {
  return (
    <Autocomplete
      //   id="country-select-demo"
      sx={{ width: 200, zIndex: 99, height: 65 }}
      options={searchData.data}
      //   id="auto-select"
      //   autoSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            marginTop: "12px",
            "& > img": { mr: 1, flexShrink: 0 },
            zIndex: 99,
          }}
          {...props}
          onClick={() => handleToDetail(option)}
        >
          <Box
            component={"img"}
            loading="lazy"
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            src={option.images.jpg.image_url}
            alt="logo"
          />
          <Box sx={{ width: "100%" }}>
            {option.title.length > 12
              ? `${option.title.slice(0, 12)}...`
              : option.title}
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search..."
          //   value={searchInput.value}
          onChange={handleChange}
          variant="standard"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    phone: "1-268",
  },

  {
    code: "CF",
    label: "Central African Republic",
    phone: "236",
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
    phone: "242",
  },
];
