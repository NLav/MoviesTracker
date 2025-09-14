import { makeRemoteCreateGenre } from "@/main/factories/usecases";
import { GenreForm } from "@/presentation/pages";

function makeGenreFormPage() {
  return <GenreForm createGenre={makeRemoteCreateGenre()} />;
}

export { makeGenreFormPage };
