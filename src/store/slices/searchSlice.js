import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PAGINATION, SEARCH_URL } from "../../config/server";

const initialState = {
  searchData: {
    data: [],
    per_page: 0,
    loading: false,
    error: false,
    total: 0,
    errMsg: "",
  },
};
export const fetchPaginationData = createAsyncThunk(
  "search-data",
  async (page) => {
    try {
      let res = await axios.get(PAGINATION(page));
      // const { total, per_page } = res.data.pagination.items;
      let result = {
        data: res.data.data,
        total: res.data.pagination.items.total,
        per_page: res.data.pagination.items.per_page,
      };
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPaginationData.pending, (state, action) => {
      state.searchData = {
        loading: true,
        data: [],
        errMsg: "",
        error: false,
      };
    });
    builder.addCase(fetchPaginationData.fulfilled, (state, action) => {
      state.searchData = {
        loading: false,
        data: action.payload.data,
        per_page: action.payload.per_page,
        total: action.payload.total,
        errMsg: "",
        error: false,
      };
    });
    builder.addCase(fetchPaginationData.rejected, (state, action) => {
      state.searchData = {
        loading: false,
        data: [],
        errMsg: "",
        error: true,
      };
    });
  },
});
export default searchSlice.reducer;
