import { useEffect } from "react";

import {
  useAppSelector,
  useGenresPaginated,
  useToast,
} from "@/presentation/hooks";
import { Genres } from "@/presentation/pages";

function MakeGenrePage() {
  const toast = useToast();

  const { parameters: genresPaginationParameters } = useAppSelector(
    (state) => state.genresPaginated
  );

  const { genres, genresError, genresMeta, isGenresLoading } =
    useGenresPaginated({
      parameters: genresPaginationParameters,
    });

  useEffect(() => {
    if (genresError) {
      toast({
        message: genresError.message,
        variant: "error",
      });
    }
  }, [genresError, toast]);

  return (
    <Genres
      genres={genres}
      genresError={genresError}
      genresMeta={genresMeta}
      genresPaginationParameters={genresPaginationParameters}
      isGenresLoading={isGenresLoading}
    />
  );
}

export { MakeGenrePage };
