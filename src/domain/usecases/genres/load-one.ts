import type { GenreModel } from "@/domain/models";

export type LoadOneGenre = {
  execute: (parameters: LoadOneGenreParameters) => Promise<LoadOneGenreModel>;
};

export type LoadOneGenreParameters = Pick<GenreModel, "id">;

export type LoadOneGenreModel = GenreModel;
