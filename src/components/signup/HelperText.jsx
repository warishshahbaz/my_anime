import { Box, Tooltip } from "@mui/material";
import { MdInfoOutline } from "react-icons/md";

export function HelperText({ errMsg, details }) {
  return (
    <>
      <Box
        component="ul"
        sx={{
          display: "flex",
          margin: "auto,0px",
          width: "100%",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Box component="li" sx={{ mr: "10px" }}>
          {errMsg}
        </Box>
        <Tooltip
          arrow
          title={
            <>
              <Box component={"ul"}>
                {details.map((val) => {
                  return <Box component={"li"}>{val}</Box>;
                })}
              </Box>
            </>
          }
        >
          <Box
            component={"span"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MdInfoOutline color="#FF9F29" size={15} />
          </Box>
        </Tooltip>
      </Box>
    </>
  );
}
