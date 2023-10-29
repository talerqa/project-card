import {Typography} from "@/components/ui/typography";
import s from './createDeckModal.module.scss'
import {CloseSvg} from "@/assets/components/close.tsx";
import {Button} from "@/components/ui/button";
import {DeckType, useCreateDeckMutation,} from "@/services/decks";
import {useState} from "react";
import {ShowModalType} from "@/pages/deck";
import {Inputs} from "@/components/ui/inputs";
import {Checkbox} from "@/components/ui/checkbox";

type Props = {
  data?: DeckType
  showModal?: string
  setShowModal: (value: ShowModalType) => void
}

export const CreateDeckModal = (props: Props) => {

  const [name, setName] = useState<string>("");
  const [activeModal, setActiveModal] = useState(!!props.showModal)
  const [checked, setCheck] = useState<boolean>(false)

  const {data} = props

  const [createDeck] = useCreateDeckMutation();

  const closeModalHandler = () => {
    setActiveModal(false)
    props.setShowModal('')
  }


  return (<>
      {activeModal && <div className={s.deleteDeckModal}>
          <div className={s.titleBlock}>
              <Typography variant={'subtitle1'}
                          as={'span'}
                          children={'Add New Pack'}/>
              <CloseSvg closeHandler={closeModalHandler}/>
          </div>
          <div className={s.inputBlock}>
              <Inputs type={'text'}
                      label={'Name Pack'}
                      onChange={(e) => setName(e.target.value)}/>
              <Checkbox onChange={() => setCheck(!checked)}
                        id={data?.id}
                        label={'Private pack'}
              />
          </div>
          <div className={s.buttonsBlock}>
              <Button type={'button'} variant={'secondary'} children={'Cancel'}
                      onClick={closeModalHandler}/>
              <Button type={'submit'}
                      children={'Add New Pack'}
                      onClick={() => {
                        createDeck({
                          name: name,
                          isPrivate: checked
                        })
                        closeModalHandler()
                      }}/>
          </div>
      </div>}
    </>
  )
}