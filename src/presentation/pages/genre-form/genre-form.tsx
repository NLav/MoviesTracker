import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { makeRemoteCreateGenre } from "@/main/factories/usecases";
import { Button, Input, PageHeader } from "@/presentation/components";
import { useToast } from "@/presentation/hooks";
import { type NewGenreProperties, NewGenreSchema } from "@/validation/models";

function GenreForm() {
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
    <div className="flex w-full flex-col gap-6">
      <PageHeader title="Novo gênero" />

      <form
        className="flex w-full flex-col gap-4 rounded-md p-4"
        onSubmit={newGenreHandleSubmit(handleSuccess)}
      >
        <Controller
          control={newGenreControl}
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
