import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getGenresPaginated } from "@/data/slices/genres/thunks";
import type { GenreModel } from "@/domain/models";
import { makeRemoteDeleteGenre } from "@/main/factories/usecases";
import { ContextMenu } from "@/presentation/components/context-menu";
import { useToast } from "@/presentation/contexts";
import { useAppDispatch, useAppSelector } from "@/presentation/hooks";
import { formatDate } from "@/shared/utils";

type GenreCardProperties = {
  genreDetails: GenreModel;
};

function GenreCard({ genreDetails }: GenreCardProperties) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { parameters } = useAppSelector((state) => state.genresLoadPaginated);

  const handleDeleteGenre = useCallback(async () => {
    const deleteGenre = makeRemoteDeleteGenre();

    try {
      await deleteGenre.execute({ id: genreDetails.id });

      dispatch(getGenresPaginated(parameters));

      toast({
        message: `Gênero "${genreDetails.name}" excluído com sucesso`,
        variant: "success",
      });
    } catch {
      toast({
        message: "Falha ao deletar o gênero",
        variant: "error",
      });
    }
  }, [dispatch, genreDetails.id, genreDetails.name, parameters, toast]);

  return (
    <div className="bg-primary border-secondary flex flex-col gap-2 rounded-md border-2 p-4">
      <div className="flex">
        <span className="truncate text-xl font-semibold">
          {genreDetails.name}
        </span>

        <ContextMenu
          className="ml-auto"
          items={[
            {
              action: () => {
                navigate(`/genres/${genreDetails.id}`);
              },
              label: "Editar",
            },
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
