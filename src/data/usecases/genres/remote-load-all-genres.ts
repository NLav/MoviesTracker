import { type HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import type {
  LoadAllGenres,
  LoadAllGenresModel,
  LoadAllGenresParameters,
} from "@/domain/usecases/genres";
import { Genre } from "@/validation/models";

export class RemoteLoadAllGenres implements LoadAllGenres {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async execute(
    parameters: LoadAllGenresParameters
  ): Promise<LoadAllGenresModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "GET",
      parameters,
    });

    const allGenres = (httpResponse.body as LoadAllGenresModel) ?? [];

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return allGenres.map((genre) => new Genre(genre));
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
