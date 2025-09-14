import { type HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import type {
  UpdateGenre,
  UpdateGenreData,
  UpdateGenreModel,
} from "@/domain/usecases/genres";
import { Genre } from "@/validation/models";

export class RemoteUpdateGenre implements UpdateGenre {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async execute(data: UpdateGenreData): Promise<UpdateGenreModel> {
    const { id, ...updatedGenreData } = data;

    const httpResponse = await this.httpClient.request({
      url: this.url + `/${id}`,
      method: "PUT",
      body: updatedGenreData,
    });

    const createdGenre = new Genre(httpResponse.body);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: {
        return createdGenre;
      }
      default: {
        throw new UnexpectedError();
      }
    }
  }
}
