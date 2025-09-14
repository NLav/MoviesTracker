import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/presentation/contexts";
import { GenreForm } from "@/presentation/pages";
import { type NewGenreProperties, NewGenreSchema } from "@/validation/models";

import { makeRemoteCreateGenre } from "../usecases";

function MakeGenreFormPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { control: newGenreControl, handleSubmit: newGenreHandleSubmit } =
    useForm<NewGenreProperties>({
      defaultValues: {
        name: undefined,
      },
      resolver: zodResolver(NewGenreSchema),
    });

  const handleGoBack = useCallback(() => {
    navigate("/genres");
  }, [navigate]);

  const handleSuccess = useCallback(
    (newGenreData: NewGenreProperties) => {
      const createGenre = makeRemoteCreateGenre();

      createGenre
        .execute(newGenreData)
        .then((createdGenre) => {
          queryClient.invalidateQueries();

          toast({
            message: `Novo gênero "${createdGenre.name}" criado`,
            variant: "success",
          });

          handleGoBack();
        })
        .catch(() => {
          toast({
            message: "Erro ao criar o gênero",
            variant: "error",
          });
        });
    },
    [handleGoBack, queryClient, toast]
  );

  return (
    <GenreForm
      handleGoBack={handleGoBack}
      newGenreControl={newGenreControl}
      onSubmit={newGenreHandleSubmit(handleSuccess)}
    />
  );
}

export { MakeGenreFormPage };
