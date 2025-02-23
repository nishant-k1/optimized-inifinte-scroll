// features/cardsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch cards
export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (currentPage, { getState }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=20`
    );
    return response.data;
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cardList: [],
    currentPage: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cardList = [...state.cardList, ...action.payload];
        state.currentPage += 1;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = cardsSlice.actions;
export default cardsSlice.reducer;
