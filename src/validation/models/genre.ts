import z from "zod";

const GenreSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});
type GenreProperties = z.infer<typeof GenreSchema>;

export const NewGenreSchema = z.object({
  name: z.string(),
});
export type NewGenreProperties = z.infer<typeof NewGenreSchema>;

export class Genre implements GenreProperties {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(properties: GenreProperties) {
    const parsedProperties = GenreSchema.parse(properties);

    this.id = parsedProperties.id;
    this.name = parsedProperties.name;
    this.createdAt = parsedProperties.createdAt;
    this.updatedAt = parsedProperties.updatedAt;
    this.deletedAt = parsedProperties.deletedAt;
  }

  static with(genre: GenreProperties): Genre {
    return new Genre(genre);
  }
}
