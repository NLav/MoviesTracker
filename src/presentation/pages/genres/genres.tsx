import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { type PaginationParameters } from "@/data/dtos";
import type { LoadPaginatedGenresModel } from "@/domain/usecases/genres";
import {
  Button,
  Input,
  ListError,
  NoItems,
  PageHeader,
  Pagination,
} from "@/presentation/components";
import { useGenresPaginated, useToast } from "@/presentation/hooks";
import { searchDelay } from "@/shared/constants";

import { GenreCard, GenreCardSkeleton } from "./components";

function renderGenres(
  genres: LoadPaginatedGenresModel["items"],
  isLoading: boolean,
  errorMessage?: string
) {
  const gridClassname =
    "grid gap-2 overflow-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  if (isLoading) {
    return (
      <div className={gridClassname}>
        {Array.from({ length: 12 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <GenreCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (errorMessage) {
    return <ListError />;
  }

  return genres.length > 0 ? (
    <div className={gridClassname}>
      {genres.map((genre) => (
        <GenreCard genreDetails={genre} key={genre.id} />
      ))}
    </div>
  ) : (
    <NoItems article="o" word="gênero" />
  );
}

function Genres() {
  const [paginationParameters, setPaginationParameters] =
    useState<PaginationParameters>({
      page: 1,
      limit: 12,
    });
  const [searchValue, setSearchValue] = useState<string>("");

  const navigate = useNavigate();
  const toast = useToast();

  const { error, genres, genresMeta, isLoading } = useGenresPaginated({
    parameters: paginationParameters,
  });

  useEffect(() => {
    if (error) {
      toast({
        message: error.message,
        variant: "error",
      });
    }
  }, [error, toast]);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader title="Gêneros">
        <Button
          onClick={() => {
            navigate("/genres/new");
          }}
          variant="primary"
        >
          Novo gênero
        </Button>
      </PageHeader>

      <Input
        delay={searchDelay}
        disabled={isLoading}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Insira a pesquisa"
        title="Pesquisa"
        value={searchValue}
      />

      {renderGenres(genres, isLoading, error?.message)}

      {genres.length > 0 && genresMeta ? (
        <div className="mt-auto">
          <Pagination
            currentLimit={paginationParameters.limit}
            currentPage={paginationParameters.page}
            handleChangeLimit={(newLimit) => {
              setPaginationParameters((current) => ({
                ...current,
                limit: newLimit,
                page: 1,
              }));
            }}
            handleChangePage={(newPage) => {
              setPaginationParameters((current) => ({
                ...current,
                page: newPage,
              }));
            }}
            totalPages={genresMeta.totalPages}
          />
        </div>
      ) : undefined}
    </div>
  );
}

export { Genres };
