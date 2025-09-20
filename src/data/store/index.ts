import { configureStore } from "@reduxjs/toolkit";

import { genresLoadOneSlice, genresLoadPaginatedSlice } from "@/data/slices";

export const store = configureStore({
  reducer: {
    genresLoadPaginated: genresLoadPaginatedSlice.reducer,
    genresLoadOne: genresLoadOneSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
