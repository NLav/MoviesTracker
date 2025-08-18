import { useEffect, useState } from "react";

import { type PaginationParameters } from "@/data/dtos";
import type {
  LoadPaginatedGenres,
  LoadPaginatedGenresModel,
} from "@/domain/usecases/genres";
import { Input, Pagination } from "@/presentation/components";
import { searchDelay } from "@/shared/constants";

import { GenreCard, GenreCardSkeleton } from "./components";

type GenresProperties = {
  loadPaginatedGenres: LoadPaginatedGenres;
};

function Genres({ loadPaginatedGenres }: GenresProperties) {
  const [genres, setGenres] = useState<LoadPaginatedGenresModel>();
  const [paginationParameters, setPaginationParameters] =
    useState<PaginationParameters>({
      page: 1,
      limit: 10,
    });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);

    loadPaginatedGenres
      .loadPaginated(paginationParameters)
      .then((response) => {
        setGenres(response);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [loadPaginatedGenres, paginationParameters, searchValue]);

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

      <div className="grid gap-2 overflow-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 15 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <GenreCardSkeleton key={index} />
            ))
          : genres &&
            genres.items.map((genre) => (
              <GenreCard genreDetails={genre} key={genre.id} />
            ))}
      </div>

      {genres ? (
        <div className="mt-auto">
          <Pagination
            currentPage={paginationParameters.page}
            handleChangeLimit={(newLimit) => {
              setPaginationParameters((current) => ({
                ...current,
                limit: newLimit,
              }));
            }}
            handleChangePage={(newPage) => {
              setPaginationParameters((current) => ({
                ...current,
                page: newPage,
              }));
            }}
            totalPages={genres.meta.totalPages}
          />
        </div>
      ) : undefined}
    </div>
  );
}

export { Genres };
