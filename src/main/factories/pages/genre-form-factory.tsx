import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { makeRemoteCreateGenre } from "@/main/factories/usecases";
import { useToast } from "@/presentation/contexts";
import { GenreForm } from "@/presentation/pages";
import { GenreFormSchema, type GenreFormType } from "@/validation/models";

function MakeGenreFormPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { genreId } = useParams();

  const { control: genreControl, handleSubmit: genreHandleSubmit } =
    useForm<GenreFormType>({
      defaultValues: {
        name: undefined,
      },
      resolver: zodResolver(GenreFormSchema),
    });

  const handleGoBack = useCallback(() => {
    navigate("/genres");
  }, [navigate]);

  const handleSuccess = useCallback(
    (genreData: GenreFormType) => {
      const createGenre = makeRemoteCreateGenre();

      createGenre
        .execute(genreData)
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
      genreControl={genreControl}
      genreId={genreId}
      handleGoBack={handleGoBack}
      onSubmit={genreHandleSubmit(handleSuccess)}
    />
  );
}

export { MakeGenreFormPage };
