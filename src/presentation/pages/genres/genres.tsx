import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { PaginationMeta, PaginationParameters } from "@/data/dtos";
import { genresPaginatedSlice } from "@/data/slices";
import type { GenreModel } from "@/domain/models";
import type { LoadPaginatedGenresModel } from "@/domain/usecases/genres";
import {
  Button,
  Input,
  ListError,
  NoItems,
  PageHeader,
  Pagination,
} from "@/presentation/components";
import { useAppDispatch } from "@/presentation/hooks";
import { searchDelay } from "@/shared/constants";

import { GenreCard, GenreCardSkeleton } from "./components";

type GenresProperties = {
  genres: GenreModel[];
  genresError: Error | null;
  genresMeta?: PaginationMeta;
  genresPaginationParameters: PaginationParameters;
  isGenresLoading: boolean;
};

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

function Genres({
  genres,
  genresError,
  genresMeta,
  genresPaginationParameters,
  isGenresLoading,
}: GenresProperties) {
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        disabled={isGenresLoading}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Insira a pesquisa"
        title="Pesquisa"
        value={searchValue}
      />

      {renderGenres(genres, isGenresLoading, genresError?.message)}

      {genres.length > 0 && genresMeta ? (
        <div className="mt-auto">
          <Pagination
            currentLimit={genresPaginationParameters.limit}
            currentPage={genresPaginationParameters.page}
            handleChangeLimit={(newLimit) => {
              dispatch(
                genresPaginatedSlice.actions.setGenresParameters({
                  ...genresPaginationParameters,
                  limit: newLimit,
                  page: 1,
                })
              );
            }}
            handleChangePage={(newPage) => {
              dispatch(
                genresPaginatedSlice.actions.setGenresParameters({
                  ...genresPaginationParameters,
                  page: newPage,
                })
              );
            }}
            totalPages={genresMeta.totalPages}
          />
        </div>
      ) : undefined}
    </div>
  );
}

export { Genres };
