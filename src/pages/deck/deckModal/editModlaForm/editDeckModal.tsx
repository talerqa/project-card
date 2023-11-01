import s from './editDeckModal.module.scss'
import {Button} from "@/components/ui/button";
import {useUpdateDeckMutation,} from "@/services/decks";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledCheckbox, ControlledInput} from "@/components/ui/controlled";
import {
  ControlledInputFile
} from "@/components/ui/controlled/controlled-input-file/controlled-input-file.tsx";
import {useState} from "react";


type DeckValuesForm = z.infer<typeof deckSchema>

const deckSchema = z.object({
  name: z.string().nonempty('Required').min(3, 'Name must be at least 3' +
    ' characters'),
  isPrivate: z.boolean(),
  cover: z
    .instanceof(File)
    .refine((file) => file.size < 1000000, 'File size must be less than 1MB')
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"].includes(files.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
})

export const EditModalForm = (props: any) => {

  const {item, closeModalHandler} = props

  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name: item?.name,
      isPrivate: props.isPrivate,
      cover: props.isPrivate,
    },
    values: {
      name: item?.name,
      isPrivate: item?.isPrivate,
      cover: item?.cover,
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
    setCover(null)
  }

  const onLoadCover = (data: File) => {
    setCover(data)
  }
  const handleSubmitForm = handleSubmit(onSubmit);

  console.log(item?.cover)
  console.log(cover)

  return <form onSubmit={handleSubmitForm} className={s.deckModal}>
    {/*<Uploader className={s.uploader} onLoadCover={onLoadCover} onLoadError={onLoadCoverError}>*/}
    <div className={s.inputBlock}>
      {item?.cover ?
        <img src={cover ? URL.createObjectURL(cover) : item?.cover}
             alt="img-deck" className={s.image}/>
        : cover
          ? <img src={cover ? URL.createObjectURL(cover) : ''}
                 alt="img-deck" className={s.image}/>
          : ' '}
      <ControlledInputFile
        name={'cover'}
        type={'file'}
        onLoadCover={onLoadCover}
        className={s.inputFile}
        title={'Changed Image'}
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

      <Button type={'button'} variant={'secondary'}
              children={'Cancel'}
              onClick={closeModalHandler}/>

      <Button type={'submit'}
              children={'Save Change'}

      />
    </div>
  </form>
}


