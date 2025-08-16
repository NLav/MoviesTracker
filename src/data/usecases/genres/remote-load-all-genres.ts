import { type HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import type { GenreModel } from "@/domain/models";
import type {
  LoadAllGenres,
  LoadAllGenresModel,
} from "@/domain/usecases/genres";

export class RemoteLoadAllGenres implements LoadAllGenres {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async loadAll(): Promise<LoadAllGenresModel[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "GET",
    });

    const allGenres = httpResponse.body ?? [];

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return allGenres.map((genre: GenreModel) => genre);
      }
      case HttpStatusCode.noContent: {
        return [];
      }
      default: {
        throw new UnexpectedError();
      }
    }
  }
}
