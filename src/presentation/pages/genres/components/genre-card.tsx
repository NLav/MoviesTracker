import type { GenreModel } from "@/domain/models";
import { formatDate } from "@/shared/utils";

type GenreCardProperties = {
  genreDetails: GenreModel;
};

function GenreCard({ genreDetails }: GenreCardProperties) {
  return (
    <div className="bg-primary-600 border-secondary-500 flex flex-col gap-2 rounded-lg border-2 p-4 text-neutral-50">
      <span className="text-xl font-semibold">{genreDetails.name}</span>

      <span className="ml-auto text-sm">
        Criado em: {formatDate(genreDetails.createdAt)}
      </span>
    </div>
  );
}

export { GenreCard };
