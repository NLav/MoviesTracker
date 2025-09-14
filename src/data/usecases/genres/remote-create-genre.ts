import { type HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import type {
  CreateGenre,
  CreateGenreData,
  CreateGenreModel,
} from "@/domain/usecases/genres";
import { Genre } from "@/validation/models";

export class RemoteCreateGenre implements CreateGenre {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(data: CreateGenreData): Promise<CreateGenreModel> {
    const httpResponse = await this.httpClient.request({
      url: "/genres",
      method: "POST",
      body: data,
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
