import type { GenreModel } from "@/domain/models";
import { ContextMenu } from "@/presentation/components/context-menu";
import { formatDate } from "@/shared/utils";

type GenreCardProperties = {
  genreDetails: GenreModel;
};

function GenreCard({ genreDetails }: GenreCardProperties) {
  return (
    <div className="bg-primary border-secondary flex flex-col gap-2 rounded-md border-2 p-4">
      <div className="flex">
        <span className="truncate text-xl font-semibold">
          {genreDetails.name}
        </span>

        <ContextMenu
          className="ml-auto"
          items={[
            { action: () => {}, label: "Editar" },
            { action: () => {}, label: "Excluir", variant: "red" },
          ]}
        />
      </div>

      <span className="col-span-2 ml-auto text-sm">
        Criado em: {formatDate(genreDetails.createdAt)}
      </span>
    </div>
  );
}

export { GenreCard };
