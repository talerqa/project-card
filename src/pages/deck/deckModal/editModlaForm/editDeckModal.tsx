import s from './editDeckModal.module.scss'
import {Button} from "@/components/ui/button";
import {useUpdateDeckMutation,} from "@/services/decks";
import {useState} from "react";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledCheckbox, ControlledInput} from "@/components/ui/controlled";


type DeckValuesForm = z.infer<typeof deckSchema>

const deckSchema = z.object({
  name: z.string().nonempty('Required').min(3, 'Name must be at least 3' +
    ' characters'),
  isPrivate: z.boolean(),
})

export const EditModalForm = (props: any) => {

  const {item, closeModalHandler} = props

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name: item?.name,
      isPrivate: props.isPrivate,
    },
    values: {
      name: item?.name,
      isPrivate: item?.isPrivate
    }
  })

  const [updateDeck] = useUpdateDeckMutation();

  const [cover, setCover] = useState<File | null>(null)

  const onSubmit = (data: DeckValuesForm) => {
    const {name, isPrivate} = data
    const formData = new FormData()
    formData.append('name', name)
    formData.append('isPrivate', `${isPrivate}`)
    cover && formData.append('cover', cover)
    updateDeck({id: item?.id, body: formData})
    closeModalHandler()
  }

  const handleSubmitForm = handleSubmit(onSubmit);


  return <form onSubmit={handleSubmitForm} className={s.deckModal}>
    {/*<Uploader className={s.uploader} onLoadCover={onLoadCover} onLoadError={onLoadCoverError}>*/}
    <div className={s.inputBlock}>
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

      <Button type={'button'} variant={'secondary'}
              children={'Cancel'}
              onClick={closeModalHandler}/>

      <Button type={'submit'}
              children={'Save Change'}

      />
    </div>
  </form>
}


