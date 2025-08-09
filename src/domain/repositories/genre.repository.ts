import type { AxiosError } from "axios";

import type { LoadAllGenreInput, LoadAllGenreOutput } from "@/domain/entities";
import type { HttpClient } from "@/shared/types";

export class GenreRepository {
  private constructor(private readonly HttpClient: HttpClient) {}

  public static create(HttpClient: HttpClient) {
    return new GenreRepository(HttpClient);
  }

  public async loadAll({
    paginationParameters,
    signal,
  }: LoadAllGenreInput): Promise<LoadAllGenreOutput> {
    try {
      const genresRequest = await this.HttpClient.request<LoadAllGenreOutput>({
        method: "GET",
        url: "/genres",
        signal,
        headers: {
          "rest-page": paginationParameters.page,
          "rest-limit": paginationParameters.limit,
          "rest-mode": paginationParameters.mode,
        },
      });

      return genresRequest.body;
    } catch (error) {
      const currentError = error as AxiosError;

      throw new Error(currentError.message);
    }
  }
}
