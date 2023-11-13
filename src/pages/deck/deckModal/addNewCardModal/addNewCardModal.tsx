import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import s from "./addNewCardModal.module.scss";

import {
  Button,
  ControlledInput,
  ControlledInputFile,
  ControlledSelect,
} from "@/components";
import {
  deckSchemaAddCardModal,
  DeckSchemaAddCardModalType,
} from "@/pages/deck/deckModal/addNewCardModal/deckSchema.ts";
import { useCreateCardMutation } from "@/services/decks";

type Props = {
  deckId?: string;
  closeModalHandler: () => void;
};

const dataControlledSelect = [
  { title: "Text", value: "text" },
  { title: "Picture", value: "picture" },
];

export const AddNewCardModal = (props: Props) => {
  const { deckId, closeModalHandler } = props;
  const [questionImg, setQuestionImg] = useState<File | undefined>();
  const [answerImg, setAnswerImg] = useState<File | undefined>();
  const [questionFormat, setQuestionFormat] = useState("");
  const [createCard] = useCreateCardMutation();

  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<DeckSchemaAddCardModalType>({
    resolver: zodResolver(deckSchemaAddCardModal),
    defaultValues: {
      answer: "",
      question: "",
      answerImg: undefined,
      questionImg: undefined,
      text: "Text",
    },
  });

  const onSubmit = (data: DeckSchemaAddCardModalType) => {
    const { question, answer, questionImg, answerImg } = data;
    const formData = new FormData();

    formData.append("question", String(question));
    formData.append("answer", String(answer));
    questionImg && formData.append("questionImg", questionImg);
    answerImg && formData.append("answerImg", answerImg);
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

  const imageQuestion = questionImg && URL.createObjectURL(questionImg);
  const imageAnswer = answerImg && URL.createObjectURL(answerImg);
  const handleSubmitForm = handleSubmit(onSubmit);

  return (
    <div className={s.modal}>
      <form onSubmit={handleSubmitForm} className={s.deckModal}>
        <div className={s.inputBlock}>
          <ControlledSelect
            placeholder={"Text"}
            array={dataControlledSelect}
            name={"text"}
            control={control}
            label={"Choose a question format"}
            className={s.select}
            onValueChange={(e) => setQuestionFormat(e)}
          />
          <ControlledInput
            name={"question"}
            type={"text"}
            control={control}
            label={"Question"}
            className={s.inputQuestion}
          />
          {imageQuestion && questionFormat === "Picture" ? (
            <img src={imageQuestion} alt="img-deck" className={s.image} />
          ) : (
            <></>
          )}
          {questionFormat === "Picture" ? (
            <ControlledInputFile
              name={"questionImg"}
              type={"file"}
              onLoadCover={onLoadCover}
              className={s.inputFile}
              title={"Add image"}
              control={control}
            />
          ) : (
            <></>
          )}
          <ControlledInput
            name={"answer"}
            type={"text"}
            control={control}
            label={"Answer"}
            className={s.inputAnswer}
          />
          {imageQuestion && questionFormat === "Picture" ? (
            <img src={imageAnswer} alt="img-deck" className={s.image} />
          ) : (
            <></>
          )}
          {questionFormat === "Picture" ? (
            <ControlledInputFile
              name={"answerImg"}
              type={"file"}
              onLoadCover={onLoadAnswerCover}
              className={s.inputFile}
              title={"Add image"}
              control={control}
            />
          ) : (
            <></>
          )}
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
