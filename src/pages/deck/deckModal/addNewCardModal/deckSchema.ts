import { z } from "zod";

export type DeckSchemaAddCardModalType = z.infer<typeof deckSchemaAddCardModal>;

export const deckSchemaAddCardModal = z.object({
  text: z.string(),
  question: z.string().min(3, "Name must be at least 3" + " characters"),
  answer: z.string().min(2, "Name must be at least 2" + " characters"),
  questionImg: z
    .instanceof(File)
    .refine((file) => file.size < 1000000, "File size must be less than 1MB")
    .refine(
      (files) =>
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/gif",
        ].includes(files.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .optional(),
  answerImg: z
    .instanceof(File)
    .refine((file) => file.size < 1000000, "File size must be less than 1MB")
    .refine(
      (files) =>
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/gif",
        ].includes(files.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .optional(),
});
