import type { Pagination, PaginationParameters } from "@/data/dtos";
import type { GenreModel } from "@/domain/models";

export type LoadPaginatedGenres = {
  loadPaginated: (
    parameters: LoadPaginatedGenresParameters
  ) => Promise<LoadPaginatedGenresModel>;
};

export type LoadPaginatedGenresParameters = PaginationParameters;

export type LoadPaginatedGenresModel = Pagination<GenreModel>;
