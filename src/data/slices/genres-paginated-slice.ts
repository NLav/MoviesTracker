import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  LoadPaginatedGenresModel,
  LoadPaginatedGenresParameters,
} from "@/domain/usecases/genres";

export type GenresPaginatedState = {
  items: LoadPaginatedGenresModel["items"];
  meta?: LoadPaginatedGenresModel["meta"];
  parameters: LoadPaginatedGenresParameters;
};

const initialState: GenresPaginatedState = {
  items: [],
  parameters: {
    limit: 12,
    page: 1,
  },
};

const genresPaginatedSlice = createSlice({
  name: "genres-paginated",
  initialState,
  reducers: {
    setGenresPaginated(state, action: PayloadAction<LoadPaginatedGenresModel>) {
      state.items = action.payload.items;
      state.meta = action.payload.meta;
    },
    setGenresParameters(
      state,
      action: PayloadAction<LoadPaginatedGenresParameters>
    ) {
      state.parameters = action.payload;
    },
  },
});

export { genresPaginatedSlice };
