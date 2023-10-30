import {Typography} from "@/components/ui/typography";
import s from './createDeckFormModal.module.scss'
import {CloseSvg} from "@/assets/components/close.tsx";
import {Button} from "@/components/ui/button";
import {DeckType, useCreateDeckMutation,} from "@/services/decks";
import {useState} from "react";
import {ShowModalType} from "@/pages/deck";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledCheckbox, ControlledInput} from "@/components/ui/controlled";


type Props = {
  data?: DeckType
  showModal?: string
  setShowModal: (value: ShowModalType) => void
}

export type DeckValuesForm = z.infer<typeof deckSchema>

export const deckSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  isPrivate: z.boolean().default(false),
})

export const CreateDeckFormModal = (props: Props) => {
  const [activeModal, setActiveModal] = useState(!!props.showModal)

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<DeckValuesForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name: '',
      isPrivate: false
    },
  })
  const [createDeck] = useCreateDeckMutation();
  const onSubmit = () => {
    createDeck({
      name: control._formValues.name,
      isPrivate: control._formValues.isPrivate,
    })
    closeModalHandler()
  }

  const handleSubmitForm = handleSubmit(onSubmit);

  const closeModalHandler = () => {
    setActiveModal(false)
    props.setShowModal('')
  }

  return (<>
      {activeModal &&
          <form onSubmit={handleSubmitForm} className={s.createDeck}>
              <div className={s.titleBlock}>
                  <Typography variant={'subtitle1'}
                              as={'span'}
                              children={'Add New Pack'}/>
                  <CloseSvg closeHandler={closeModalHandler}/>
              </div>
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
                          onClick={closeModalHandler}/>
                  <Button type={'submit'}
                          children={'Add New Pack'}
                  />
              </div>
          </form>}
    </>
  )
}