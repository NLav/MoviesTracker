import z from "zod";

const GenreSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

type GenreProperties = z.infer<typeof GenreSchema>;

export class GenreEntity implements GenreProperties {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;

  constructor(properties: GenreProperties) {
    const parsedProperties = GenreSchema.parse(properties);
    Object.assign(this, parsedProperties);
  }

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  static with(genre: GenreProperties): GenreEntity {
    return new GenreEntity(genre);
  }
}
