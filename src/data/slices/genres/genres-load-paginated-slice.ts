import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  LoadPaginatedGenresModel,
  LoadPaginatedGenresParameters,
} from "@/domain/usecases/genres";

import { getGenresPaginated } from "./thunks";

export type GenresPaginatedState = {
  error?: string;
  isLoading: boolean;
  items: LoadPaginatedGenresModel["items"];
  meta?: LoadPaginatedGenresModel["meta"];
  parameters: LoadPaginatedGenresParameters;
};

const initialState: GenresPaginatedState = {
  isLoading: false,
  items: [],
  parameters: {
    limit: 12,
    page: 1,
  },
};

const genresLoadPaginatedSlice = createSlice({
  name: "load-genres-paginated",
  initialState,
  reducers: {
    setGenres(state, action: PayloadAction<LoadPaginatedGenresModel["items"]>) {
      state.items = action.payload;
    },
    setGenresParameters(
      state,
      action: PayloadAction<LoadPaginatedGenresParameters>
    ) {
      state.parameters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGenresPaginated.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getGenresPaginated.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.meta = action.payload.meta;
      })
      .addCase(getGenresPaginated.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export { genresLoadPaginatedSlice };
