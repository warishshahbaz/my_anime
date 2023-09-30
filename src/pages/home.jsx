import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/UI/layout/header";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Box, Skeleton } from "@mui/material";
import DetailAnime from "../components/home/detailAnime";
import { ANIME_URL } from "../config/server";
import NoDataFound from "../components/UI/layout/NoData";

const Home = () => {
  const [animeData, setAnimeData] = useState({
    loading: false,
    data: [],
    error: "",
  });
  const [detailToggle, setDetailToggle] = useState(false);
  const [detailAnimeData, setDetailAnimeData] = useState({});
  const [searchInput, setSearchInput] = useState({
    name: "",
    value: "",
  });

  const searchHandle = (e) => {
    const { value, name } = e.target;
    console.log(value, "val-----------------------");
    setSearchInput({
      name: name,
      value: value,
    });
  };

  async function fetchAnimeData() {
    setAnimeData((pre) => {
      return {
        ...pre,
        loading: true,
      };
    });
    try {
      let res = await axios.get(ANIME_URL);
      setAnimeData((pre) => {
        return {
          ...pre,
          data: res.data.data,
          loading: true,
        };
      });
    } catch (error) {
      setAnimeData((pre) => {
        return {
          ...pre,
          error: error.message,
        };
      });
    }
  }

  console.log(animeData.data, "animeData.data");
  useEffect(() => {
    fetchAnimeData();
  }, []);

  let filterData = useMemo(() => {
    return animeData.data.filter((item) =>
      item.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }, [animeData.data, searchInput.value]);
  console.log(filterData, "filterData");
  const handleToDetail = (anime) => {
    setDetailToggle(true);
    setDetailAnimeData(anime);
  };
  return (
    <>
      <Header handleChange={searchHandle} searchInput={searchInput} />
      {detailToggle ? (
        <Box
          component={"div"}
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <DetailAnime
            data={detailAnimeData}
            setDetailToggle={setDetailToggle}
          />
        </Box>
      ) : animeData.loading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",

            flexWrap: "wrap",
            padding: "12px",
            gap: 3,
          }}
        >
          {!filterData.length > 0 ? (
            <NoDataFound />
          ) : (
            filterData.map((anime) => {
              return (
                <Card
                  sx={{
                    width: 250,
                    height: 300,
                    maxWidth: 345,
                    ":hover": {
                      boxShadow: "0 1px 0px 1px gray",
                    },
                  }}
                  onClick={() => handleToDetail(anime)}
                >
                  <CardHeader
                    title={
                      <Box component={"p"} sx={{ fontSize: "15px" }}>
                        {anime.title.length > 20
                          ? `${anime.title.slice(0, 20)}...`
                          : anime.title}
                      </Box>
                    }
                    subheader="September 14, 2016"
                  />
                  <Box
                    component={"img"}
                    sx={{
                      height: "150px",
                      width: "100%",
                      objectFit: "fill",
                    }}
                    src={anime.images.jpg.image_url}
                  />

                  <Box
                    component={"p"}
                    sx={{ fontSize: "13px", padding: "4px" }}
                    color="text.secondary"
                  >
                    Rating : {anime.rating}
                  </Box>
                  <Box
                    component={"p"}
                    sx={{ fontSize: "13px", padding: "4px" }}
                    color="text.secondary"
                  >
                    Score : {anime.score}
                  </Box>
                </Card>
              );
            })
          )}
        </Box>
      ) : (
        <AnimeSkelaton />
      )}
    </>
  );
};

function AnimeSkelaton() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",

          flexWrap: "wrap",
          padding: "12px",
          gap: 3,
        }}
      >
        {Array.from(12).map((val) => {
          return <Skeleton variant="rectangular" width={250} height={300} />;
        })}
      </Box>
    </>
  );
}

export default Home;
