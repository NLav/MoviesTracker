import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type {
  LoadPaginatedGenresModel,
  LoadPaginatedGenresParameters,
} from "@/domain/usecases/genres";
import { makeRemoteLoadPaginatedGenres } from "@/main/factories/usecases";

export type GenresPaginatedState = {
  items: LoadPaginatedGenresModel["items"];
  meta?: LoadPaginatedGenresModel["meta"];
  isLoading: boolean;
  error?: string;
};

const initialState: GenresPaginatedState = {
  items: [],
  isLoading: false,
};

export const getGenresPaginated = createAsyncThunk<
  LoadPaginatedGenresModel,
  LoadPaginatedGenresParameters
>("genres/get-paginated", async (parameters, { rejectWithValue }) => {
  try {
    const usecase = makeRemoteLoadPaginatedGenres();

    return await usecase.loadPaginated(parameters);
  } catch (error: any) {
    return rejectWithValue(error.message ?? "Unexpected error");
  }
});

const genresPaginatedSlice = createSlice({
  name: "genres-paginated",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenresPaginated.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getGenresPaginated.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.meta = action.payload.meta;
      })
      .addCase(getGenresPaginated.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { genresPaginatedSlice };
