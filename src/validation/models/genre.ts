import z from "zod";

const GenreSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});
type GenreType = z.infer<typeof GenreSchema>;

export const GenreFormSchema = z.object({
  name: z.string(),
});
export type GenreFormType = z.infer<typeof GenreFormSchema>;

export class Genre implements GenreType {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(properties: GenreType) {
    const parsedProperties = GenreSchema.parse(properties);

    this.id = parsedProperties.id;
    this.name = parsedProperties.name;
    this.createdAt = parsedProperties.createdAt;
    this.updatedAt = parsedProperties.updatedAt;
    this.deletedAt = parsedProperties.deletedAt;
  }

  static with(genre: GenreType): Genre {
    return new Genre(genre);
  }
}
