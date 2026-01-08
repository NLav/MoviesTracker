import type { Pagination, PaginationParameters } from "@/data/dtos";
import type { GenreModel } from "@/domain/models";

export type LoadPaginatedGenres = {
  execute: (
    parameters: LoadPaginatedGenresParameters
  ) => Promise<LoadPaginatedGenresModel>;
};

export type LoadPaginatedGenresParameters = PaginationParameters & {
  searchValue?: string;
};

export type LoadPaginatedGenresModel = Pagination<GenreModel>;
