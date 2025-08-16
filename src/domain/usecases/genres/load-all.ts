import type { GenreModel } from "@/domain/models";

export interface LoadAllGenres {
  loadAll: () => Promise<LoadAllGenresModel[]>;
}

export type LoadAllGenresModel = GenreModel;
