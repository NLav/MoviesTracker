import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import type { GenreModel } from "@/domain/models";
import { makeRemoteDeleteGenre } from "@/main/factories/usecases";
import { ContextMenu } from "@/presentation/components/context-menu";
import { useToast } from "@/presentation/hooks";
import { formatDate } from "@/shared/utils";

type GenreCardProperties = {
  genreDetails: GenreModel;
};

function GenreCard({ genreDetails }: GenreCardProperties) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const handleDeleteGenre = useCallback(() => {
    const deleteGenre = makeRemoteDeleteGenre();
    deleteGenre
      .delete({ id: genreDetails.id })
      .then(() => {
        queryClient.invalidateQueries();

        toast({
          message: `Gênero "${genreDetails.name}" excluído com sucesso`,
          variant: "success",
        });
      })
      .catch(() => {
        toast({
          message: "Falha ao deletar o gênero",
          variant: "error",
        });
      });
  }, [genreDetails.id, genreDetails.name, queryClient, toast]);

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
            {
              action: () => {
                handleDeleteGenre();
              },
              label: "Excluir",
              variant: "red",
            },
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
