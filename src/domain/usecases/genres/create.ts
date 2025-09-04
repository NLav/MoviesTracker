import type { GenreModel } from "@/domain/models";

export type CreateGenre = {
  create: (data: CreateGenreData) => Promise<CreateGenreModel>;
};

export type CreateGenreData = Pick<GenreModel, "name">;

export type CreateGenreModel = GenreModel;
