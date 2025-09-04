import type { GenreModel } from "@/domain/models";

export type LoadAllGenres = {
  loadAll: (parameters: LoadAllGenresParameters) => Promise<LoadAllGenresModel>;
};

export type LoadAllGenresParameters = {
  searchValue?: string;
};

export type LoadAllGenresModel = GenreModel[];
