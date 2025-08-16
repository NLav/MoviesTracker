import { makeRemoteLoadAllGenres } from "@/main/factories/usecases";
import { Genres } from "@/presentation/pages";

function makeGenrePage() {
  return <Genres loadAllGenres={makeRemoteLoadAllGenres()} />;
}

export { makeGenrePage };
