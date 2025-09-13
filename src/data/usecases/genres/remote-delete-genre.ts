import { type HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import type {
  DeleteGenre,
  DeleteGenreModel,
  DeleteGenreParameters,
} from "@/domain/usecases/genres";
import { Genre } from "@/validation/models";

export class RemoteDeleteGenre implements DeleteGenre {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async execute(parameters: DeleteGenreParameters): Promise<DeleteGenreModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url + `/${parameters.id}`,
      method: "DELETE",
    });

    const deletedGenre = new Genre(httpResponse.body);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return deletedGenre;
      }
      default: {
        throw new UnexpectedError();
      }
    }
  }
}
