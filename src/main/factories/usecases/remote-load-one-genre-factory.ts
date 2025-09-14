import { RemoteLoadOneGenre } from "@/data/usecases/genres";
import type { LoadOneGenre } from "@/domain/usecases/genres";
import { makeAxiosHttpClient } from "@/main/factories/http";

function makeRemoteLoadOneGenre(): LoadOneGenre {
  return new RemoteLoadOneGenre(makeAxiosHttpClient());
}

export { makeRemoteLoadOneGenre };
