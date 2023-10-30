import {Typography} from "@/components/ui/typography";
import s from './editDeckModal.module.scss'
import {CloseSvg} from "@/assets/components/close.tsx";
import {Button} from "@/components/ui/button";
import {useGetDeckQuery, useUpdateDeckMutation,} from "@/services/decks";
import {memo, useState} from "react";
import {ShowModalType} from "@/pages/deck";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledCheckbox, ControlledInput} from "@/components/ui/controlled";
import {Simulate} from "react-dom/test-utils";


type Props = {
  // data?: DeckType
  id: string
  showModal?: string
  setShowModal: (value: ShowModalType) => void
}

type DeckValuesForm = z.infer<typeof deckSchema>

const deckSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  isPrivate: z.boolean(),
})


export const EditDeckModal = memo((props: Props) => {
  console.log('EditDeckModal')


  const [activeModal, setActiveModal] = useState(!!props.showModal)
  const {data: value} = useGetDeckQuery({id: props.id})





  return (<>
      {activeModal && <DeckForm value={value} setActiveModal={setActiveModal} setShowModal={props.setShowModal}/>}
    </>
  )
})


const DeckForm = (props: any) => {

  const {value, setActiveModal} = props
  console.log(value)
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name: value?.name,
      isPrivate: value?.isPrivate,
    },
  })

  const [updateDeck] = useUpdateDeckMutation();
  const [cover, setCover] = useState<File | null>(null)

  const onSubmit = (data: DeckValuesForm) => {
    const {name, isPrivate} = data
    const formData = new FormData()
    formData.append('name', name)
    formData.append('isPrivate', `${isPrivate}`)
    cover && formData.append('cover', cover)
    updateDeck({id: value?.id, body: formData})
    closeModalHandler()
  }

  // const onLoadCover = (data: File) => {
  //   setCover(data)
  //   setCoverError(null)
  // }

  const handleSubmitForm = handleSubmit(onSubmit);

  const closeModalHandler = () => {
    setActiveModal(false)
    props.setShowModal('')
  }

  return <form onSubmit={handleSubmitForm} className={s.deleteDeckModal}>
    <div className={s.titleBlock}>
      <Typography variant={'subtitle1'}
                  as={'span'}
                  children={'Edit Pack'}/>
      {/*<CloseSvg closeHandler={closeModalHandler}/>*/}
    </div>
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