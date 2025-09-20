import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { genresLoadPaginatedSlice } from "@/data/slices";
import { getOneGenre } from "@/data/slices/genres/thunks";
import type { CreateGenre, UpdateGenre } from "@/domain/usecases/genres";
import { Button, Input, PageHeader } from "@/presentation/components";
import { useToast } from "@/presentation/contexts";
import { useAppDispatch, useAppSelector } from "@/presentation/hooks";
import type { GenreFormType } from "@/validation/models";
import { GenreFormSchema } from "@/validation/models";

type GenreFormProperties = {
  createGenre: CreateGenre;
  updateGenre: UpdateGenre;
};

function GenreForm({ createGenre, updateGenre }: GenreFormProperties) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { genreId } = useParams();
  const {
    isLoading: isGenreLoading,
    error: genreError,
    item: genreDetails,
  } = useAppSelector((state) => state.genresLoadOne);
  const { items: genres } = useAppSelector(
    (state) => state.genresLoadPaginated
  );

  const {
    control: genreControl,
    handleSubmit: genreHandleSubmit,
    setValue: genreSetValue,
  } = useForm<GenreFormType>({
    defaultValues: {
      name: undefined,
    },
    resolver: zodResolver(GenreFormSchema),
  });

  const handleGoBack = useCallback(() => {
    navigate("/genres");
  }, [navigate]);

  const handleSuccess = useCallback(
    async (genreData: GenreFormType) => {
      try {
        if (genreId) {
          const updatedGenre = await updateGenre.execute({
            id: genreId,
            ...genreData,
          });

          dispatch(
            genresLoadPaginatedSlice.actions.setGenres(
              genres.map((genre) =>
                genre.id === updatedGenre.id ? updatedGenre : genre
              )
            )
          );
        } else {
          await createGenre.execute(genreData);
        }

        toast({
          message: genreId
            ? `Gênero "${genreData.name}" atualizado`
            : `Novo gênero "${genreData.name}" criado`,
          variant: "success",
        });

        handleGoBack();
      } catch {
        toast({
          message: genreId
            ? "Erro ao editar o gênero"
            : "Erro ao criar o gênero",
          variant: "error",
        });
      }
    },
    [createGenre, dispatch, genreId, genres, handleGoBack, toast, updateGenre]
  );

  useEffect(() => {
    if (genreId) {
      dispatch(getOneGenre({ id: genreId }));
    }
  }, [dispatch, genreId]);

  useEffect(() => {
    if (genreDetails) {
      genreSetValue("name", genreDetails.name);
    }
  }, [genreDetails, genreSetValue]);

  if (genreError) {
    return <span>{genreError}</span>;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader title={genreId ? "Editar gênero" : "Criar gênero"} />

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
              isLoading={isGenreLoading}
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
            disabled={isGenreLoading}
            onClick={handleGoBack}
            variant="primaryOutlined"
          >
            Voltar
          </Button>

          <Button
            className="w-40"
            disabled={isGenreLoading}
            type="submit"
            variant="primary"
          >
            Criar
          </Button>
        </div>
      </form>
    </div>
  );
}

export { GenreForm };
