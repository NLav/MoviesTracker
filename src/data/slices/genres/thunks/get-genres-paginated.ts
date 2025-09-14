import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
  LoadPaginatedGenresModel,
  LoadPaginatedGenresParameters,
} from "@/domain/usecases/genres";
import { makeRemoteLoadPaginatedGenres } from "@/main/factories/usecases";

const getGenresPaginated = createAsyncThunk<
  LoadPaginatedGenresModel,
  LoadPaginatedGenresParameters
>("genres/get-paginated", async (parameters, { rejectWithValue }) => {
  try {
    const loadPaginatedGenres = makeRemoteLoadPaginatedGenres();

    return await loadPaginatedGenres.execute(parameters);
  } catch (error: any) {
    return rejectWithValue(error.message ?? "Unexpected error");
  }
});

export { getGenresPaginated };
