import type { GenreModel } from "@/domain/models";

export type DeleteGenre = {
  delete: (data: DeleteGenreParameters) => Promise<DeleteGenreModel>;
};

export type DeleteGenreParameters = Pick<GenreModel, "id">;

export type DeleteGenreModel = GenreModel;
