import type { IPagination } from "@/shared/types";

import type { GenreEntity } from "../entities";

export class GenreRepository {
  public async loadAll() //  { parameters }: ILoadAllGenreInput
  : Promise<IPagination<GenreEntity>> {
    return {
      items: [
        {
          id: "aaaaa",
          name: "Terror",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: undefined,
        },
      ],
      meta: {
        currentPage: 1,
        limit: 10,
        totalPages: 5,
      },
    };
  }
}
