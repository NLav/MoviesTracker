import { makeRemoteLoadPaginatedGenres } from "@/main/factories/usecases";
import { Genres } from "@/presentation/pages";

function makeGenrePage() {
  return <Genres loadPaginatedGenres={makeRemoteLoadPaginatedGenres()} />;
}

export { makeGenrePage };
