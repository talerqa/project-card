import {Typography} from "@/components/ui/typography";
import s from './deckDeleteModal.module.scss'
import {CloseSvg} from "@/assets/components/close.tsx";
import {Button} from "@/components/ui/button";
import {DeckType, useDeleteDeckMutation} from "@/services/decks";
import {useState} from "react";
import {ShowModalType} from "@/pages/deck";

type Props = {
  data?: DeckType
  showModal?: string
  setShowModal: (value: ShowModalType) => void
}

export const DeleteDeckModal = (props: Props) => {

  const [activeModal, setActiveModal] = useState(!!props.showModal)
  const {data} = props

  const [deletePack] = useDeleteDeckMutation()
  const closeModalHandler = () =>{
    setActiveModal(false)
    props.setShowModal('')
  }

  return (<>
      {activeModal && <div className={s.deleteDeckModal}>
          <div className={s.titleBlock}>
              <Typography variant={'subtitle1'}
                          as={'span'}
                          children={'Delete Pack'}/>
              <CloseSvg closeHandler={closeModalHandler}/>
          </div>
          <div className={s.textBlock}>
              <Typography variant={'body1'} className={s.text} as={"p"}>
                  Do you really want to remove
                  <Typography variant={'subtitle1'}
                              className={s.namePack}
                              as={'span'} children={` ${data?.name} ?`}/>
              </Typography>
              <Typography variant={'body1'} className={s.text} as={"span"}>
                  All cards will be deleted
              </Typography>
          </div>
          <div className={s.buttonsBlock}>
              <Button type={'button'} variant={'secondary'} children={'Cancel'}
                      onClick={closeModalHandler}/>
              <Button type={'submit'} children={'Delete Pack'}
                      onClick={() => {
                        deletePack({id: data?.id})
                        closeModalHandler()
                      }}/>
          </div>
      </div>}
    </>
  )
}