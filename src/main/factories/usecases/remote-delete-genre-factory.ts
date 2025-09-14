import { RemoteDeleteGenre } from "@/data/usecases/genres";
import type { DeleteGenre } from "@/domain/usecases/genres";
import { makeAxiosHttpClient } from "@/main/factories/http";

function makeRemoteDeleteGenre(): DeleteGenre {
  return new RemoteDeleteGenre(makeAxiosHttpClient());
}

export { makeRemoteDeleteGenre };
