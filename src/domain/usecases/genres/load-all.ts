import type { GenreModel } from "@/domain/models";

export type LoadAllGenres = {
  execute: (parameters: LoadAllGenresParameters) => Promise<LoadAllGenresModel>;
};

export type LoadAllGenresParameters = {
  searchValue?: string;
};

export type LoadAllGenresModel = GenreModel[];
