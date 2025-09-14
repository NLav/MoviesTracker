import { useCallback, useEffect } from "react";

import { getGenresPaginated } from "@/data/slices/genres/thunks";
import type { LoadPaginatedGenresParameters } from "@/domain/usecases/genres";
import { useAppDispatch, useAppSelector } from "@/presentation/hooks";

type UseGenresPaginatedProperties = {
  parameters: LoadPaginatedGenresParameters;
};

function useGenresPaginated({ parameters }: UseGenresPaginatedProperties) {
  const dispatch = useAppDispatch();

  const { isLoading, items, error, meta } = useAppSelector(
    (state) => state.genresPaginated
  );

  const dispatchGenresPaginated = useCallback(() => {
    dispatch(getGenresPaginated(parameters));
  }, [dispatch, parameters]);

  useEffect(() => {
    dispatchGenresPaginated();
  }, [dispatch, dispatchGenresPaginated, parameters]);

  return {
    genres: items,
    genresError: error,
    genresMeta: meta,
    isGenresLoading: isLoading,
  };
}

export { useGenresPaginated };
