import s from './editDeckModal.module.scss'
import {Button} from "@/components/ui/button";
import {useGetDeckQuery, useUpdateDeckMutation,} from "@/services/decks";
import {useState} from "react";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledCheckbox, ControlledInput} from "@/components/ui/controlled";
import {DialogsModal} from "@/components/ui/dialogs";


type Props = {
  // data?: DeckType
  id: string
  pack: any
  // name: string
  activeMenu?: boolean
  // setShowModal: (value: ShowModalType) => void
  setActiveMenu: any
}

type DeckValuesForm = z.infer<typeof deckSchema>

const deckSchema = z.object({
  name: z.string().nonempty('Required').min(3, 'Name must be at least 3' +
    ' characters'),
  isPrivate: z.boolean(),
})

export const EditDeckModal = (props: Props) => {

  // const [activeModal, setActiveModal] = useState(!!props.showModal)
  const {data: value} = useGetDeckQuery({id: props.id})


  console.log(props.id)

  return (<DeckForm value={value}
                    activeMenu={props.activeMenu}
    //setActiveModal={setActiveModal}
                    item={props.pack}
                    id={props.id}
    // name={props.name}
                    setActiveMenu={props.setActiveMenu}
    //                  setShowModal={props.setShowModal}
  />)
}

const DeckForm = (props: any) => {

  const {item, value, setActiveModal} = props
  const [updateDeck] = useUpdateDeckMutation();
  const [cover, setCover] = useState<File | null>(null)


  //
  // const startValues = {
  //   name: props.name,
  //   isPrivate: props.isPrivate,
  //
  // }

  console.log(
    item
  )

  const {
    handleSubmit,
    control,
   watch,
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

  console.log(watch(item?.name, true))

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

  const closeModalHandler = () => {
    // setActiveModal(false)
    props.setShowModal('')
    // setOpen(false)
  }

  return <div className={s.block}>
    <DialogsModal open={props.activeMenu} setOpen={props.setActiveMenu}
                  title={'Edit' +
                    ' Pack'}>

      <form onSubmit={handleSubmitForm} className={s.deckModal}>
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
    </DialogsModal>
  </div>
}