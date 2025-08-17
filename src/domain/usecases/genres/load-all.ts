import type { GenreModel } from "@/domain/models";

export interface LoadAllGenres {
  loadAll: (
    parameters: LoadAllGenresParameters
  ) => Promise<LoadAllGenresModel[]>;
}

export type LoadAllGenresModel = GenreModel;

export type LoadAllGenresParameters = {
  searchValue?: string;
};
