import { GenreRepository } from "@/domain/repositories";
import { LoadAllGenresUsecase } from "@/domain/usecases";
import { api } from "@/infrastructure/api";
import { HttpClientAdapter } from "@/infrastructure/http";

const MakeLoadAllGenres = () => {
  const httpClient = new HttpClientAdapter(api);
  const loadAllGenres = LoadAllGenresUsecase.create(
    GenreRepository.create(httpClient)
  );

  return loadAllGenres;
};

export { MakeLoadAllGenres };
