import { RemoteCreateGenre } from "@/data/usecases/genres";
import type { CreateGenre } from "@/domain/usecases/genres";
import { makeAxiosHttpClient } from "@/main/factories/http";

function makeRemoteCreateGenre(): CreateGenre {
  return new RemoteCreateGenre(makeAxiosHttpClient());
}

export { makeRemoteCreateGenre };
