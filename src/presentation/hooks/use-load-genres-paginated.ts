import { useCallback, useEffect } from "react";

import { getGenresPaginated } from "@/data/slices/genres/thunks";
import { useAppDispatch, useAppSelector } from "@/presentation/hooks";

function useLoadGenresPaginated() {
  const dispatch = useAppDispatch();

  const { isLoading, items, parameters, error, meta } = useAppSelector(
    (state) => state.genresLoadPaginated
  );

  const dispatchLoadGenresPaginated = useCallback(() => {
    dispatch(getGenresPaginated(parameters));
  }, [dispatch, parameters]);

  useEffect(() => {
    dispatchLoadGenresPaginated();
  }, [dispatch, dispatchLoadGenresPaginated, parameters]);

  return {
    genres: items,
    genresError: error,
    genresMeta: meta,
    genresPaginationParameters: parameters,
    isGenresLoading: isLoading,
  };
}

export { useLoadGenresPaginated };
