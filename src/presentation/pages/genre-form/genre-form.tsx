import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import type { CreateGenre } from "@/domain/usecases/genres";
import { Button, Input, PageHeader } from "@/presentation/components";
import { useToast } from "@/presentation/contexts";
import type { GenreFormType } from "@/validation/models";
import { GenreFormSchema } from "@/validation/models";

type GenreFormProperties = {
  createGenre: CreateGenre;
};

function GenreForm({ createGenre }: GenreFormProperties) {
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
    <div className="flex w-full flex-col gap-6">
      <PageHeader title={`${genreId ? "Editar" : "Criar"} gênero`} />

      <form
        className="flex w-full flex-col gap-4 rounded-md p-4"
        onSubmit={genreHandleSubmit(handleSuccess)}
      >
        <Controller
          control={genreControl}
          name="name"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              errorMessage={error?.message}
              onChange={onChange}
              placeholder="Nome do gênero"
              title="Nome"
              value={value}
            />
          )}
        />

        <div className="mx-auto flex gap-4">
          <Button
            className="w-40"
            onClick={handleGoBack}
            variant="primaryOutlined"
          >
            Voltar
          </Button>

          <Button className="w-40" type="submit" variant="primary">
            Criar
          </Button>
        </div>
      </form>
    </div>
  );
}

export { GenreForm };
