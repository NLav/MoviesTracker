import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { makeRemoteCreateGenre } from "@/main/factories/usecases";
import { Button, Input, PageHeader } from "@/presentation/components";
import { type NewGenreProperties, NewGenreSchema } from "@/validation/models";

function GenreForm() {
  const navigate = useNavigate();

  const { control: newGenreControl, handleSubmit: newGenreHandleSubmit } =
    useForm<NewGenreProperties>({
      defaultValues: {
        name: undefined,
      },
      resolver: zodResolver(NewGenreSchema),
    });

  const handleSuccess = useCallback(
    (newGenreData: NewGenreProperties) => {
      const createGenre = makeRemoteCreateGenre();

      createGenre
        .create(newGenreData)
        .then((createdGenre) => {
          alert(`Novo gênero criado, ID ${createdGenre.id}`);
          navigate("/genres");
        })
        .catch((error) => {
          alert(error);
        });
    },
    [navigate]
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

        <Button className="mx-auto w-40" type="submit" variant="primary">
          Criar
        </Button>
      </form>
    </div>
  );
}

export { GenreForm };
