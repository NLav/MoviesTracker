import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
  LoadOneGenreModel,
  LoadOneGenreParameters,
} from "@/domain/usecases/genres";
import { makeRemoteLoadOneGenre } from "@/main/factories/usecases";

const getOneGenre = createAsyncThunk<LoadOneGenreModel, LoadOneGenreParameters>(
  "genres/get-one",
  async (parameters, { rejectWithValue }) => {
    try {
      const loadOneGenre = makeRemoteLoadOneGenre();

      return await loadOneGenre.execute(parameters);
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Unexpected error");
    }
  }
);

export { getOneGenre };
