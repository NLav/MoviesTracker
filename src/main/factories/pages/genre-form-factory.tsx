import {
  makeRemoteCreateGenre,
  makeRemoteUpdateGenre,
} from "@/main/factories/usecases";
import { GenreForm } from "@/presentation/pages";

function makeGenreFormPage() {
  return (
    <GenreForm
      createGenre={makeRemoteCreateGenre()}
      updateGenre={makeRemoteUpdateGenre()}
    />
  );
}

export { makeGenreFormPage };
