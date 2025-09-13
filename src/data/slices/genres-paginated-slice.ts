import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { LoadPaginatedGenresModel } from "@/domain/usecases/genres";

export type GenresPaginatedState = {
  items: LoadPaginatedGenresModel["items"];
  meta?: LoadPaginatedGenresModel["meta"];
};

const initialState: GenresPaginatedState = {
  items: [],
};

const genresPaginatedSlice = createSlice({
  name: "genres-paginated",
  initialState,
  reducers: {
    setGenresPaginated(state, action: PayloadAction<LoadPaginatedGenresModel>) {
      state.items = action.payload.items;
      state.meta = action.payload.meta;
    },
  },
});

export { genresPaginatedSlice };
