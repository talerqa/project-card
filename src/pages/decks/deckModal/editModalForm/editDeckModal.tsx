import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import s from "./editDeckModal.module.scss";

import { Button } from "@/components/ui/button";
import {
  ControlledCheckbox,
  ControlledInput,
} from "@/components/ui/controlled";
import { ControlledInputFile } from "@/components/ui/controlled/controlled-input-file/controlled-input-file.tsx";
import { useUpdateDeckMutation } from "@/services/decks";

type DeckValuesForm = z.infer<typeof deckSchema>;

const deckSchema = z.object({
  name: z
    .string()
    .nonempty("Required")
    .min(3, "Name must be at least 3" + " characters"),
  isPrivate: z.boolean().optional(),
  cover: z
    .instanceof(File)
    .refine(
      (file) => file?.size < 1000000,
      "File size must be less" + " than 1MB",
    )
    .refine(
      (files) =>
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/gif",
        ].includes(files?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .optional(),
});

export const EditModalForm = (props: any) => {
  const { item, closeModalHandler } = props;
  const [cover, setCover] = useState<File | null>(null);
  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name: item?.name,
      isPrivate: item?.isPrivate,
    },
  });

  const [updateDeck] = useUpdateDeckMutation();

  const onSubmit = (data: DeckValuesForm) => {
    const { name, isPrivate } = data;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("isPrivate", `${isPrivate}`);
    cover && formData.append("cover", cover);
    updateDeck({ id: item?.id, body: formData });
    closeModalHandler();
    setCover(null);
  };

  const onLoadCover = (data: File) => {
    setCover(data);
  };
  const handleSubmitForm = handleSubmit(onSubmit);

  return (
    <form onSubmit={handleSubmitForm} className={s.deckModal}>
      <div className={s.inputBlock}>
        {item?.cover ? (
          <img
            src={cover ? URL.createObjectURL(cover) : item?.cover}
            alt="img-deck"
            className={s.image}
          />
        ) : (
          cover && (
            <img
              src={cover ? URL.createObjectURL(cover) : ""}
              alt="img-deck"
              className={s.image}
            />
          )
        )}
        <ControlledInputFile
          name={"cover"}
          type={"file"}
          onLoadCover={onLoadCover}
          className={s.inputFile}
          title={"Changed Image"}
          control={control}
        />
        <ControlledInput
          name={"name"}
          type={"text"}
          control={control}
          label={"Name Pack"}
          className={s.input}
        />
        <ControlledCheckbox
          name={"isPrivate"}
          label={"Private pack"}
          control={control}
          className={s.checkbox}
        />
      </div>
      <div className={s.buttonsBlock}>
        <Button
          type={"button"}
          variant={"secondary"}
          onClick={closeModalHandler}
        >
          Cancel
        </Button>
        <Button type={"submit"}>Save Change</Button>
      </div>
    </form>
  );
};
