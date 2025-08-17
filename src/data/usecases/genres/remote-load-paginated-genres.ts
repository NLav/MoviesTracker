import { type HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import type {
  LoadPaginatedGenres,
  LoadPaginatedGenresModel,
  LoadPaginatedGenresParameters,
} from "@/domain/usecases/genres";
import { Genre } from "@/validation/models";

export class RemoteLoadPaginatedGenres implements LoadPaginatedGenres {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async loadPaginated(
    parameters: LoadPaginatedGenresParameters
  ): Promise<LoadPaginatedGenresModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "GET",
      parameters,
    });

    const response = httpResponse.body as LoadPaginatedGenresModel;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return {
          items: response.items.map((item) => new Genre(item)),
          meta: response.meta,
        };
      }
      case HttpStatusCode.noContent: {
        return {
          items: [],
          meta: response.meta,
        };
      }
      default: {
        throw new UnexpectedError();
      }
    }
  }
}
