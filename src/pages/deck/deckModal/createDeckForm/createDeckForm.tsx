import {z} from "zod";
import {useCreateDeckMutation} from "@/services/decks";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import s from './createDeckForml.module.scss'
import {ControlledCheckbox, ControlledInput} from "@/components/ui/controlled";
import {Button} from "@/components/ui/button";

export type DeckValuesForm1 = z.infer<typeof deckSchema>

export const deckSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  isPrivate: z.boolean().default(false),
})

export const CreateDeckForm = (props: any) => {

  const [createDeck] = useCreateDeckMutation();
  const onSubmit = () => {
    createDeck({
      name: control._formValues.name,
      isPrivate: control._formValues.isPrivate,
    })
    props.closeModalHandler()
  }

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<DeckValuesForm1>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name: '',
      isPrivate: false
    },
  })

  const handleSubmitForm = handleSubmit(onSubmit);

  return <form onSubmit={handleSubmitForm} className={s.createDeck}>
    <div className={s.inputBlock}>
      <ControlledInput
        name={"name"}
        type={"text"}
        control={control}
        label={"Name Pack"}
        errorMessage={errors.name?.message}
        className={s.input}
      />
      <ControlledCheckbox
        name={"isPrivate"}
        label={"Private pack"}
        control={control}
      />
    </div>
    <div className={s.buttonsBlock}>
      <Button type={'button'} variant={'secondary'}
              children={'Cancel'}
              onClick={props.closeModalHandler}/>
      <Button type={'submit'}
              children={'Add New Pack'}
      />
    </div>
  </form>
}