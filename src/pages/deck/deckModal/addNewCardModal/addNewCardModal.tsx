import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import s from "./addNewCardModal.module.scss";

import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled";
import { ControlledInputFile } from "@/components/ui/controlled/controlled-input-file/controlled-input-file.tsx";
import { ControlledSelect } from "@/components/ui/controlled/controlled-select/controlled-select.tsx";
import { useCreateCardMutation } from "@/services/decks";

type Props = {
  deckId?: string;
  closeModalHandler: () => void;
};

type DeckValuesForm = z.infer<typeof deckSchema>;

const deckSchema = z.object({
  text: z.string().min(3, "Name must be at least 3" + " characters"),
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

export const AddNewCardModal = (props: Props) => {
  const { deckId, closeModalHandler } = props;
  const [questionImg, setQuestionImg] = useState<File | undefined>();
  const [answerImg, setAnswerImg] = useState<File | undefined>();

  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      answer: "",
      question: "",
      answerImg: undefined,
      questionImg: undefined,
      text: "Text",
    },
  });

  const [createCard] = useCreateCardMutation();

  const onSubmit = (data: DeckValuesForm) => {
    const { question, answer, questionImg, answerImg } = data;
    const formData = new FormData();

    formData.append("question", String(question));
    formData.append("answer", String(answer));
    questionImg && formData.append("questionImg", questionImg);
    answerImg && formData.append("answerImg", answerImg);
    console.log(formData);
    createCard({ id: deckId, body: formData })
      .unwrap()
      .then(() => {})
      .catch((error) => {
        toast.warn(error.data.errorMessages[0].message);
        toast.warn(error.data.errorMessages[1].message);
      });

    closeModalHandler();
  };

  const onLoadCover = (data: File) => {
    setQuestionImg(data);
  };

  const onLoadAnswerCover = (data: File) => {
    setAnswerImg(data);
  };

  const handleSubmitForm = handleSubmit(onSubmit);
  const imageQuestion = questionImg && URL.createObjectURL(questionImg);
  const imageAnswer = answerImg && URL.createObjectURL(answerImg);

  return (
    <div className={s.modal}>
      <form onSubmit={handleSubmitForm} className={s.deckModal}>
        <div className={s.inputBlock}>
          <ControlledSelect
            placeholder={"Text"}
            array={[
              { title: "Text", value: "text" },
              { title: "Picture", value: "picture" },
            ]}
            name={"text"}
            control={control}
            defaultValue={"text"}
            label={"Choose a question format"}
            className={s.select}
          />
          <ControlledInput
            name={"question"}
            type={"text"}
            control={control}
            label={"Question"}
            className={s.inputQuestion}
          />
          {imageQuestion && (
            <img src={imageQuestion} alt="img-deck" className={s.image} />
          )}
          <ControlledInputFile
            name={"questionImg"}
            type={"file"}
            onLoadCover={onLoadCover}
            className={s.inputFile}
            title={"Add image"}
            control={control}
          />
          <ControlledInput
            name={"answer"}
            type={"text"}
            control={control}
            label={"Answer"}
            className={s.inputAnswer}
          />
          {imageAnswer && (
            <img src={imageAnswer} alt="img-deck" className={s.image} />
          )}
          <ControlledInputFile
            name={"answerImg"}
            type={"file"}
            onLoadCover={onLoadAnswerCover}
            className={s.inputFile}
            title={"Add image"}
            control={control}
          />
        </div>
        <div className={s.buttonsBlock}>
          <Button
            type={"button"}
            variant={"secondary"}
            onClick={props.closeModalHandler}
          >
            Cancel
          </Button>
          <Button type={"submit"}>Save Change</Button>
        </div>
      </form>
    </div>
  );
};
