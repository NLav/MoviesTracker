import type { GenreModel } from "@/domain/models";

export type UpdateGenre = {
  execute: (data: UpdateGenreData) => Promise<UpdateGenreModel>;
};

export type UpdateGenreData = Pick<GenreModel, "id" | "name">;

export type UpdateGenreModel = GenreModel;
