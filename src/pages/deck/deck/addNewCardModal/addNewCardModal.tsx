import s from './addNewCardModal.module.scss'
import {Button} from "@/components/ui/button";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledInput} from "@/components/ui/controlled";
import {useCreateCardMutation} from "@/services/decks";
import {DialogsModal} from "@/components/ui/dialogs";
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

export const AddNewCardModal = (props: any) => {

  const {item, closeModalHandler} = props

  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      text: '',
      question: '',
      answer: '',
    },
  })

  const [createCard] = useCreateCardMutation()

  const onSubmit = (data: DeckValuesForm) => {
    const {text, question, answer} = data
    const formData = new FormData()
    formData.append('text', text)
    formData.append('question', question)
    formData.append('answer', answer)

    //  cover && formData.append('cover', cover)
    createCard({id: item?.id, body: formData})
    closeModalHandler()
  }

  const handleSubmitForm = handleSubmit(onSubmit);

  return <DialogsModal
    open={props.open}
    setOpen={props.setOpen}
    title={'Add New Card'}
    className={s.modal}
  >
    <form onSubmit={handleSubmitForm} className={s.deckModal}>
      {/*<Uploader className={s.uploader} onLoadCover={onLoadCover} onLoadError={onLoadCoverError}>*/}
      <div className={s.inputBlock}>
        <ControlledSelect
          placeholder={'Text'}
          array={[{title: "Text", value: "text"},
            {title: "Picture", value: "picture"},]}
          name={"text"}
          control={control}
          label={"Choose a question format"}
          className={s.input}
        />
        <ControlledInput
          name={"question"}
          type={"text"}
          control={control}
          label={"Question"}
          className={s.input}
        />
        <ControlledInput
          name={"answer"}
          type={"text"}
          control={control}
          label={"Answer"}
          className={s.input}
        />
      </div>
      <div className={s.buttonsBlock}>

        <Button type={'button'} variant={'secondary'}
                children={'Cancel'}
                onClick={closeModalHandler}/>

        <Button type={'submit'}
                children={'Save Change'}

        />
      </div>
    </form>
  </DialogsModal>
}


