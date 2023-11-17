import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import s from "./editCardModal.module.scss";

import { Button, ControlledInput, ControlledInputFile } from "@/components";
import { CardType } from "@/services";
import { useUpdateCardMutation } from "@/services/cards";

type DeckValuesForm = z.infer<typeof deckSchema>;

const deckSchema = z.object({
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

type Props = {
  closeModalHandler: () => void;
  card: CardType;
};
export const EditCardModal = (props: Props) => {
  const { card, closeModalHandler } = props;

  const [questionImg, setQuestionImg] = useState<File | null>(null);
  const [answerImg, setAnswerImg] = useState<File | null>(null);

  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      answer: card.answer,
      question: card.question,
    },
  });
  const onLoadQuestionImg = (data: File) => {
    setQuestionImg(data);
  };

  const onLoadAnswerImg = (data: File) => {
    setAnswerImg(data);
  };

  const [updateCard] = useUpdateCardMutation();

  const onSubmit = (data: DeckValuesForm) => {
    const { question, answer, answerImg, questionImg } = data;
    const formData = new FormData();

    formData.append("question", String(question));
    formData.append("answer", String(answer));
    answerImg && formData.append("answerImg", answerImg);
    questionImg && formData.append("questionImg", questionImg);
    updateCard({ id: card?.id, body: formData });
    closeModalHandler();
  };

  const handleSubmitForm = handleSubmit(onSubmit);

  return (
    <div className={s.modal}>
      <form onSubmit={handleSubmitForm} className={s.deckModal}>
        <div className={s.inputBlock}>
          <ControlledInput
            name={"question"}
            type={"text"}
            control={control}
            label={"Question"}
            className={s.inputQuestion}
          />
          {card?.questionImg ? (
            <img
              src={
                questionImg
                  ? URL.createObjectURL(questionImg)
                  : card?.questionImg
              }
              alt="img-deck"
              className={s.image}
            />
          ) : (
            questionImg && (
              <img
                src={questionImg ? URL.createObjectURL(questionImg) : ""}
                alt="img-deck"
                className={s.image}
              />
            )
          )}
          <ControlledInputFile
            name={"questionImg"}
            type={"file"}
            onLoadCover={onLoadQuestionImg}
            className={s.inputFile}
            title={"Changed Image"}
            control={control}
          />
          <ControlledInput
            name={"answer"}
            type={"text"}
            control={control}
            label={"Answer"}
            className={s.inputAnswer}
          />
          {card?.answerImg ? (
            <img
              src={answerImg ? URL.createObjectURL(answerImg) : card?.answerImg}
              alt="img-deck"
              className={s.image}
            />
          ) : (
            answerImg && (
              <img
                src={answerImg ? URL.createObjectURL(answerImg) : ""}
                alt="img-deck"
                className={s.image}
              />
            )
          )}
        </div>
        <ControlledInputFile
          name={"answerImg"}
          type={"file"}
          onLoadCover={onLoadAnswerImg}
          className={s.inputFile}
          title={"Changed Image"}
          control={control}
        />
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
    </div>
  );
};
