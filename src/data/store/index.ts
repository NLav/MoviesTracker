import { configureStore } from "@reduxjs/toolkit";

import { genresPaginatedSlice } from "@/data/slices";

export const store = configureStore({
  reducer: {
    genresPaginated: genresPaginatedSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
