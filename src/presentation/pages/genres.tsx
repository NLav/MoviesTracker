import { useEffect } from "react";

import type { LoadAllGenres } from "@/domain/usecases/genres";

type GenresProperties = {
  loadAllGenres: LoadAllGenres;
};

function Genres({ loadAllGenres }: GenresProperties) {
  useEffect(() => {
    loadAllGenres.loadAll().then(console.log).catch(console.error);
  }, [loadAllGenres]);

  return (
    <div>
      <span>Genres</span>
    </div>
  );
}

export { Genres };
