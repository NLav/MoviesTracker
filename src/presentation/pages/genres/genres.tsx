import { useEffect, useState } from "react";

import type {
  LoadPaginatedGenres,
  LoadPaginatedGenresModel,
} from "@/domain/usecases/genres";
import { Input } from "@/presentation/components";
import { searchDelay } from "@/shared/constants";

import { GenreCard, GenreCardSkeleton } from "./components";

type GenresProperties = {
  loadPaginatedGenres: LoadPaginatedGenres;
};

function Genres({ loadPaginatedGenres }: GenresProperties) {
  const [genres, setGenres] = useState<LoadPaginatedGenresModel>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    loadPaginatedGenres
      .loadPaginated({ page: 2, limit: 3 })
      .then((response) => {
        setGenres(response);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, [loadPaginatedGenres, searchValue]);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="font-semibold">Gêneros</h1>

      <Input
        delay={searchDelay}
        disabled={isLoading}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Insira a pesquisa"
        title="Pesquisa"
        value={searchValue}
      />

      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 15 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <GenreCardSkeleton key={index} />
            ))
          : genres?.items.map((genre) => (
              <GenreCard genreDetails={genre} key={genre.id} />
            ))}
      </div>
    </div>
  );
}

export { Genres };
