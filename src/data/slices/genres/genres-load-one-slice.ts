import { createSlice } from "@reduxjs/toolkit";

import type {
  LoadOneGenreModel,
  LoadOneGenreParameters,
} from "@/domain/usecases/genres";

import { getOneGenre } from "./thunks";

export type GenresOneState = {
  error?: string;
  isLoading: boolean;
  item?: LoadOneGenreModel;
  parameters?: LoadOneGenreParameters;
};

const initialState: GenresOneState = {
  isLoading: false,
};

const genresLoadOneSlice = createSlice({
  name: "load-one-genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneGenre.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getOneGenre.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(getOneGenre.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export { genresLoadOneSlice };
