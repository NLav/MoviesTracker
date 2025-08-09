import type { LoadAllGenreInput, LoadAllGenreOutput } from "@/domain/entities";
import type { GenreRepository } from "@/domain/repositories";
import type { Usecase } from "@/shared/types";

export class LoadAllGenresUsecase
  implements Usecase<LoadAllGenreInput, LoadAllGenreOutput>
{
  private constructor(private readonly genreRepository: GenreRepository) {}

  public static create(genreRepository: GenreRepository): LoadAllGenresUsecase {
    return new LoadAllGenresUsecase(genreRepository);
  }

  public async execute(
    loadAllGenreInput: LoadAllGenreInput
  ): Promise<LoadAllGenreOutput> {
    const genres = await this.genreRepository.loadAll(loadAllGenreInput);

    return genres;
  }
}
