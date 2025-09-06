import { useCallback } from "react";

import { getGenresPaginated } from "@/data/slices";
import type { LoadPaginatedGenresParameters } from "@/domain/usecases/genres";
import { useAppDispatch, useAppSelector } from "@/presentation/hooks";

function useGenresPaginated() {
  const dispatch = useAppDispatch();
  const { items, meta, isLoading, error } = useAppSelector(
    (state) => state.genresPaginated
  );

  const getUsersPaginated = useCallback(
    (parameters: LoadPaginatedGenresParameters) =>
      dispatch(getGenresPaginated(parameters)),
    [dispatch]
  );

  return {
    genres: items,
    genresMeta: meta,
    isLoading,
    error,
    getUsersPaginated,
  };
}

export { useGenresPaginated };
