import { useQuery } from "@tanstack/react-query";

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

  const { isLoading, error } = useQuery({
    queryKey: ["genres-paginated", parameters],
    queryFn: async () => {
      const loadPaginatedGenres = makeRemoteLoadPaginatedGenres();
      const response = await loadPaginatedGenres.loadPaginated(parameters);

      dispatch(genresPaginatedSlice.actions.setGenresPaginated(response));

      return response;
    },
    staleTime: 1000 * 60 * 10,
  });

  return {
    genres: items,
    genresMeta: meta,
    isLoading,
    error,
  };
}

export { useGenresPaginated };
