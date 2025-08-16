import { useEffect, useState } from "react";

import type {
  LoadAllGenres,
  LoadAllGenresModel,
} from "@/domain/usecases/genres";

type GenresProperties = {
  loadAllGenres: LoadAllGenres;
};

function Genres({ loadAllGenres }: GenresProperties) {
  const [genres, setGenres] = useState<LoadAllGenresModel[]>([]);

  useEffect(() => {
    loadAllGenres
      .loadAll()
      .then((response) => {
        setGenres(response);
      })
      .catch((error) => {
        alert(error);
      });
  }, [loadAllGenres]);

  return (
    <div>
      <span>Genres</span>

      <span>
        {genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </span>
    </div>
  );
}

export { Genres };
