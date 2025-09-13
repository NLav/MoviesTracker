import { type Control, Controller } from "react-hook-form";

import { Button, Input, PageHeader } from "@/presentation/components";
import type { NewGenreProperties } from "@/validation/models";

type GenreFormProperties = {
  handleGoBack: () => void;
  newGenreControl: Control<NewGenreProperties>;
  onSubmit: () => void;
};

function GenreForm({
  handleGoBack,
  newGenreControl,
  onSubmit,
}: GenreFormProperties) {
  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader title="Novo gênero" />

      <form
        className="flex w-full flex-col gap-4 rounded-md p-4"
        onSubmit={onSubmit}
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
