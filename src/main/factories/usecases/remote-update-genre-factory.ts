import { RemoteUpdateGenre } from "@/data/usecases/genres";
import type { UpdateGenre } from "@/domain/usecases/genres";
import { makeAxiosHttpClient } from "@/main/factories/http";

function makeRemoteUpdateGenre(): UpdateGenre {
  return new RemoteUpdateGenre(makeAxiosHttpClient());
}

export { makeRemoteUpdateGenre };
