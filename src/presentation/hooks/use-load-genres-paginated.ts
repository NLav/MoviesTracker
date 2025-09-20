import { useCallback, useEffect } from "react";

import { getGenresPaginated } from "@/data/slices/genres/thunks";
import type { LoadPaginatedGenresParameters } from "@/domain/usecases/genres";
import { useAppDispatch, useAppSelector } from "@/presentation/hooks";

type UseLoadGenresPaginatedProperties = {
  parameters: LoadPaginatedGenresParameters;
};

function useLoadGenresPaginated({
  parameters,
}: UseLoadGenresPaginatedProperties) {
  const dispatch = useAppDispatch();

  const { isLoading, items, error, meta } = useAppSelector(
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
    isGenresLoading: isLoading,
  };
}

export { useLoadGenresPaginated };
