import { Box, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const DetailAnime = ({ data, setDetailToggle }) => {
  console.log(data, "datahh");
  const result = useMemo(() => {
    return [
      {
        title: "Title",
        value: data.title,
      },
      {
        title: "Status",
        value: data.status,
      },
      {
        title: "Duration",
        value: data.duration,
      },
      {
        title: "season",
        value: data.season,
      },
      {
        title: "Rating",
        value: data.rating,
      },
      {
        title: "Trailer",
        value: data.trailer.url,
      },
      {
        title: "Details",
        value: data.background,
      },
    ];
  }, [data]);

  return (
    <>
      <Box sx={{ position: "absolute", top: "80px", left: "12px" }}>
        <Tooltip title={<Box component={"span"}>Back</Box>}>
          <AiOutlineArrowLeft
            size={22}
            onClick={() => setDetailToggle(false)}
          />
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: "3px",
          "@media(max-width:450px)": {
            justifyContent: "center",
          },
        }}
      >
        <Box
          sx={{
            width: "600px",
            display: "flex",
            border: "1px solid gray",
            borderRadius: "5px",
            "@media (max-width: 780px)": {
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "300px",
              "@media (max-width: 780px)": {
                width: "100%",
              },
            }}
            component={"img"}
            src={data.images.jpg.image_url}
            alt="logo"
          ></Box>
          <Box
            sx={{
              "@media(minWidth:450px)": {
                width: "100%",
              },
            }}
          >
            {result.map((item) => {
              return (
                <>
                  {item.title === "Trailer" ? (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        gap: 4,
                        padding: "2px 5px",
                      }}
                      component={"a"}
                      href={item.value}
                    >
                      <Box component={"span"}>{item.title}</Box> :
                      <Box component={"span"} sx={{ color: "blueviolet" }}>
                        LInk
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        gap: 2,
                        padding: "2px 5px",
                      }}
                      component={"p"}
                    >
                      <Box component={"span"} sx={{ width: "60px" }}>
                        {item.title}
                      </Box>
                      :{" "}
                      <Box component={"span"} sx={{ textOverflow: "ellipsis" }}>
                        {item.value?.length > 30
                          ? `${item.value?.slice(0, 20)}...`
                          : item.value}
                      </Box>{" "}
                    </Box>
                  )}
                </>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailAnime;
