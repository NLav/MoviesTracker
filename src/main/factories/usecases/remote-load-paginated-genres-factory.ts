import { RemoteLoadPaginatedGenres } from "@/data/usecases/genres";
import { type LoadPaginatedGenres } from "@/domain/usecases/genres";
import { makeAxiosHttpClient } from "@/main/factories/http";

function makeRemoteLoadPaginatedGenres(): LoadPaginatedGenres {
  return new RemoteLoadPaginatedGenres("/genres", makeAxiosHttpClient());
}

export { makeRemoteLoadPaginatedGenres };
