import s from './editCardModal.module.scss'
import {Button} from "@/components/ui/button";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledInput} from "@/components/ui/controlled";
import {useCreateCardMutation} from "@/services/decks";
import {
  ControlledSelect
} from "@/components/ui/controlled/controlled-select/controlled-select.tsx";


type DeckValuesForm = z.infer<typeof deckSchema>

const deckSchema = z.object({
  text: z.string().min(3, 'Name must be at least 3' +
    ' characters'),
  question: z.string().min(3, 'Name must be at least 3' +
    ' characters'),
  answer: z.string().min(2, 'Name must be at least 2' +
    ' characters'),
})

export const EditCardModal = (props: any) => {

  const {deckId} = props

  console.log(
    deckId
  )

  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      answer: '',
      question: ''
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
    //  cover && formData.append('cover', cover)
    props.closeModalHandler()
  }

  const handleSubmitForm = handleSubmit(onSubmit);

  return <div className={s.modal} >
    <form onSubmit={handleSubmitForm} className={s.deckModal}>
      {/*<Uploader className={s.uploader} onLoadCover={onLoadCover} onLoadError={onLoadCoverError}>*/}
      <div className={s.inputBlock}>
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

