import { type HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import type {
  LoadOneGenre,
  LoadOneGenreModel,
  LoadOneGenreParameters,
} from "@/domain/usecases/genres";
import { Genre } from "@/validation/models";

export class RemoteLoadOneGenre implements LoadOneGenre {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(
    parameters: LoadOneGenreParameters
  ): Promise<LoadOneGenreModel> {
    const httpResponse = await this.httpClient.request({
      url: `/genres/${parameters.id}`,
      method: "GET",
    });

    const genre = (httpResponse.body as LoadOneGenreModel) ?? undefined;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return new Genre(genre);
      }
      default: {
        throw new UnexpectedError();
      }
    }
  }
}
