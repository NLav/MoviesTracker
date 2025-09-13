import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { genresPaginatedSlice } from "@/data/slices";
import type { LoadPaginatedGenresParameters } from "@/domain/usecases/genres";
import { makeRemoteLoadPaginatedGenres } from "@/main/factories/usecases";
import { useAppDispatch, useAppSelector } from "@/presentation/hooks";

type UseGenresPaginatedProperties = {
  parameters: LoadPaginatedGenresParameters;
};

function useGenresPaginated({ parameters }: UseGenresPaginatedProperties) {
  const dispatch = useAppDispatch();

  const { items, meta } = useAppSelector((state) => state.genresPaginated);

  const { error, data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["genres-paginated", parameters],
    queryFn: async () => {
      const loadPaginatedGenres = makeRemoteLoadPaginatedGenres();
      const response = await loadPaginatedGenres.execute(parameters);

      return response;
    },
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (data) {
      dispatch(genresPaginatedSlice.actions.setGenresPaginated(data));
    }
  }, [data, dispatch]);

  return {
    genres: items,
    genresError: error,
    genresMeta: meta,
    genresRefetch: refetch,
    isGenresLoading: isLoading || isRefetching,
  };
}

export { useGenresPaginated };
