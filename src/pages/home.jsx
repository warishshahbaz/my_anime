import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/UI/layout/header";
import axios from "axios";
import Card from "@mui/material/Card";
import { Box, Pagination, Skeleton } from "@mui/material";
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
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState({
    name: "",
    value: "",
  });
  const PER_PAGE = 8;

  // filter data according to search
  let filterData = useMemo(() => {
    return animeData.data.filter((item) =>
      item.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }, [animeData.data, searchInput.value]);

  const handlePagination = (e, value) => {
    setPage(value);
  };

  const searchHandle = (e) => {
    const { value, name } = e.target;
    setSearchInput({
      name: name,
      value: value,
    });
  };

  // fetching anime data
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
          loading: false,
        };
      });
    } catch (error) {
      setAnimeData((pre) => {
        return {
          ...pre,
          loading: false,
          error: error.message,
        };
      });
    }
  }

  useEffect(() => {
    document.title = "Anime App";
    fetchAnimeData();
  }, []);

  const handleToDetail = (anime) => {
    setDetailToggle(true);
    setDetailAnimeData(anime);
  };

  const firstIndex = page * PER_PAGE;
  const lastIndex = firstIndex + PER_PAGE;
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
      ) : !animeData.loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              padding: "12px",
              gap: 3,
              "@media(min-width:1550px)": {
                width: "90%",
              },
            }}
          >
            {!filterData.slice(firstIndex, lastIndex) > 0 ? (
              <NoDataFound />
            ) : (
              filterData.slice(firstIndex, lastIndex).map((anime) => {
                return (
                  <AnimeCard anime={anime} handleToDetail={handleToDetail} />
                );
              })
            )}
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Pagination
              page={page}
              count={Math.ceil(filterData.length / PER_PAGE) - 1}
              onChange={handlePagination}
              variant="outlined"
              shape="rounded"
              color="secondary"
            />
          </Box>
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
        {new Array(8).fill().map((val) => (
          <Skeleton variant="rectangular" width={250} height={300} />
        ))}
      </Box>
    </>
  );
}

function AnimeCard({ anime, handleToDetail }) {
  return (
    <Card
      sx={{
        width: 250,
        height: 250,
        maxWidth: 345,
        boxShadow:
          "0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)",
        transition: "all ease 200ms",
        ":hover": {
          transform: "scale(1.03)",
          boxShadow:
            "0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)",
        },
      }}
      onClick={() => handleToDetail(anime)}
    >
      <Box
        component={"p"}
        sx={{ fontSize: "15px", padding: " 5px 10px", fontWeight: "500" }}
      >
        {anime.title.length > 20
          ? `${anime.title.slice(0, 20)}...`
          : anime.title}
      </Box>

      <Box
        component={"img"}
        sx={{
          height: "150px",
          width: "280px",
          backgroundColor: "rgb(198, 158, 158)",
          objectFit: "cover",
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
}
export default Home;
