import { RemoteLoadAllGenres } from "@/data/usecases/genres";
import type { LoadAllGenres } from "@/domain/usecases/genres";
import { makeAxiosHttpClient } from "@/main/factories/http";

function makeRemoteLoadAllGenres(): LoadAllGenres {
  return new RemoteLoadAllGenres(makeAxiosHttpClient());
}

export { makeRemoteLoadAllGenres };
