import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/UI/layout/header";
import axios from "axios";
import Card from "@mui/material/Card";
import { Box, Pagination, Skeleton } from "@mui/material";
import DetailAnime from "../components/home/detailAnime";
import { ANIME_URL, PAGINATION } from "../config/server";
import NoDataFound from "../components/UI/layout/NoData";
import Error from "../components/UI/layout/error";

const Home = () => {
  const [detailToggle, setDetailToggle] = useState(false);
  const [detailAnimeData, setDetailAnimeData] = useState({});
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    loading: false,
    error: false,
    page: 0,
    data: [],
    per_page: 0,
    total: 0,
  });
  const [searchInput, setSearchInput] = useState({
    name: "",
    value: "",
  });
  const [searchData, setSearchData] = useState({
    loading: false,
    data: [],
    error: false,
  });

  async function fetchPaginationData(page) {
    setPaginationData((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    try {
      let res = await axios.get(PAGINATION(page));
      const { total, per_page } = res.data.pagination.items;
      setPaginationData({
        page: res.data.pagination.current_page,
        data: res.data.data,
        per_page: per_page,
        total: total,
        loading: false,
      });
    } catch (error) {
      setPaginationData((prev) => {
        return {
          ...prev,
          loading: false,
          error: true,
        };
      });
    }
  }
  // filter data according to search
  // let filterData = useMemo(() => {
  //   return paginationData.data.filter((item) =>
  //     item.title.toLowerCase().includes(searchInput.value.toLowerCase())
  //   );
  // }, [paginationData.data, searchInput.value]);

  const handlePagination = (e, value) => {
    setPage(value);
  };

  async function fetchSearchData(value, page) {
    setSearchData((pre) => {
      return {
        ...pre,
        loading: true,
      };
    });
    try {
      let res = await axios.get(PAGINATION(page));

      let result = res.data.data.filter((val, i) => {
        return (
          value &&
          val &&
          val.title &&
          val.title.toLowerCase().includes(value.toLowerCase())
        );
      });
      setSearchData((pre) => {
        return {
          ...pre,
          loading: false,
          data: result,
        };
      });
    } catch (error) {
      setSearchData((pre) => {
        return {
          ...pre,
          loading: false,
          error: true,
        };
      });
    }
  }
  // search input data
  const searchHandle = (e) => {
    const { value, name } = e.target;

    fetchSearchData(value, page);
    setSearchInput({
      name: name,
      value: value,
    });
  };
  useEffect(() => {
    document.title = "Anime App";
    fetchPaginationData(page);
  }, [page]);

  const handleToDetail = (anime) => {
    setDetailToggle(true);
    setDetailAnimeData(anime);
  };

  return (
    <>
      <Header
        handleChange={searchHandle}
        searchInput={searchInput}
        searchData={searchData}
        handleToDetail={handleToDetail}
      />
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
      ) : paginationData.error ? (
        <Error text={"Network Error"} />
      ) : !paginationData.loading ? (
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
              marginTop: "12px",
              gap: 3,
              "@media(min-width:1550px)": {
                width: "90%",
              },
            }}
          >
            {!paginationData.data > 0 ? (
              <NoDataFound />
            ) : (
              paginationData.data.map((anime) => {
                return (
                  <AnimeCard anime={anime} handleToDetail={handleToDetail} />
                );
              })
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "15px 5px",
            }}
          >
            <Pagination
              page={page}
              count={
                Math.ceil(paginationData.total / paginationData.per_page) - 1
              }
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
          "@media(min-width:1550px)": {
            width: "90%",
          },
        }}
      >
        {new Array(8).fill().map((val) => (
          <Skeleton variant="rectangular" width={250} height={250} />
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
          zIndex: 9999999,
          boxShadow:
            "0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)",
        },
        "@media(min-width: 1300px)": {
          width: 300,
          height: 300,
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
          objectFit: "cover",
          "@media(min-width: 1300px)": {
            width: "100%",
            height: 200,
          },
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
