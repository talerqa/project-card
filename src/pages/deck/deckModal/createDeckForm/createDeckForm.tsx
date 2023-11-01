import {z} from "zod";
import {useCreateDeckMutation} from "@/services/decks";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import s from './createDeckForml.module.scss'
import {ControlledCheckbox, ControlledInput} from "@/components/ui/controlled";
import {Button} from "@/components/ui/button";
import {
  ControlledInputFile
} from "@/components/ui/controlled/controlled-input-file/controlled-input-file.tsx";
import {useState} from "react";

export type DeckValuesForm = z.infer<typeof deckSchema>

export const deckSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  isPrivate: z.boolean().default(false),
  cover: z
    .instanceof(File)
    .refine((file) => file.size < 1000000, 'File size must be less than 1MB')
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"].includes(files.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional()
})

export const CreateDeckForm = (props: any) => {
  const [createDeck] = useCreateDeckMutation();
  const [cover, setCover] = useState<File | undefined>()

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name: '',
      isPrivate: false,
      cover: undefined,
    }
  })

  const onSubmit = (data: DeckValuesForm) => {
    const {name, isPrivate, cover} = data
    const formData = new FormData()
    formData.append('name', String(name))
    formData.append('isPrivate', String(isPrivate))
    cover && formData.append('cover', cover)
    createDeck(formData)
    props.closeModalHandler()
  }

  const onLoadCover = (data: File) => {
    setCover(data)
  }

  const handleSubmitForm = handleSubmit(onSubmit);

  const image = cover && URL.createObjectURL(cover)

  return <form onSubmit={handleSubmitForm} className={s.createDeck}>
    <div className={s.inputBlock}>
      {image && <img src={image} alt="img-deck" className={s.image}/>}
      <ControlledInputFile
        name={'cover'}
        type={'file'}
        onLoadCover={onLoadCover}
        className={s.inputFile}
        title={'Add image'}
        control={control}/>
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