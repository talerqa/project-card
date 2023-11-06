import s from './addNewCardModal.module.scss'
import {Button} from "@/components/ui/button";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledInput} from "@/components/ui/controlled";
import {useCreateCardMutation} from "@/services/decks";
import {
  ControlledSelect
} from "@/components/ui/controlled/controlled-select/controlled-select.tsx";
import {
  ControlledInputFile
} from "@/components/ui/controlled/controlled-input-file/controlled-input-file.tsx";
import {useState} from "react";

type Props = {
  deckId?: string
  closeModalHandler: () => void
}

type DeckValuesForm = z.infer<typeof deckSchema>

const deckSchema = z.object({
  text: z.string().min(3, 'Name must be at least 3' +
    ' characters'),
  question: z.string().min(3, 'Name must be at least 3' +
    ' characters'),
  answer: z.string().min(2, 'Name must be at least 2' +
    ' characters'),
  questionImg: z
    .instanceof(File)
    .refine((file) => file.size < 1000000, 'File size must be less than 1MB')
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"].includes(files.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
  answerImg: z
    .instanceof(File)
    .refine((file) => file.size < 1000000, 'File size must be less than 1MB')
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"].includes(files.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
})

export const AddNewCardModal = (props: Props) => {

  const {deckId, closeModalHandler} = props
  // const [answrImg, setAnswerImg] = useState<File | undefined>()
  const [questionImg, setQuestionImg] = useState<File | undefined>()



  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      answer: '',
      question: '',
      answerImg: undefined,
      questionImg: undefined,

    },
  })

  const [createCard] = useCreateCardMutation()

  const onSubmit = (data: DeckValuesForm) => {
    const {question, answer} = data
    const formData = new FormData()

    formData.append('question', String(question))
    formData.append('answer', String(answer))
    createCard({id: deckId, body: formData})
    console.log(formData.get('question'))
    questionImg && formData.append('questionImg', questionImg)
    closeModalHandler()
  }

  const onLoadCover = (data: File) => {
    setQuestionImg(data)
  }

  const handleSubmitForm = handleSubmit(onSubmit);
  const image = questionImg && URL.createObjectURL(questionImg)

  return <div className={s.modal} >
    <form onSubmit={handleSubmitForm} className={s.deckModal}>
      {/*<Uploader className={s.uploader} onLoadCover={onLoadCover} onLoadError={onLoadCoverError}>*/}
      <div className={s.inputBlock}>
        {image && <img src={image} alt="img-deck" className={s.image}/>}
        <ControlledInputFile
          name={'questionImg'}
          type={'file'}
          onLoadCover={onLoadCover}
          className={s.inputFile}
          title={'Add image'}
          control={control}/>
        <ControlledSelect
          placeholder={'Text'}
          array={[{title: "Text", value: "text"},
            {title: "Picture", value: "picture"},]}
          name={"text"}
          control={control}
          defaultValue={'text'}
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
        <ControlledInput
          name={"answer"}
          type={"text"}
          control={control}
          label={"Answer"}
          className={s.inputAnswer}
        />
      </div>
      <div className={s.buttonsBlock}>
        <Button type={'button'} variant={'secondary'}
                children={'Cancel'}
                onClick={props.closeModalHandler}/>
        <Button type={'submit'}
                children={'Save Change'}
        />
      </div>
    </form>
  </div>
}


