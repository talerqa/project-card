import {Typography} from "@/components/ui/typography";
import s from './deckDeleteModal.module.scss'
import {CloseSvg} from "@/assets/components/close.tsx";
import {Button} from "@/components/ui/button";
import {DeckType} from "@/services/decks";
import {useState} from "react";

type Props = {
  data?: DeckType
  showModal?: string
  deletePack: ({}) => void
  setShowModal: any
}

export const DeleteDeckModal = (props: Props) => {

  const [showModal, setShowModal] = useState(!!props.showModal)

  const {data, deletePack} = props

  console.log(
    showModal
  )
  return (<>
      {showModal && <div className={s.deleteDeckModal}>
          <div className={s.titleBlock}>
              <Typography variant={'subtitle1'}
                          as={'span'}
                          children={'Delete Pack'}/>
              <CloseSvg closeHandler={() => {
                setShowModal(false)
                props.setShowModal('')
              }
              }/>
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
                      onClick={() => {
                        setShowModal(false)
                        props.setShowModal('')
                      }}/>
              <Button type={'submit'} children={'Delete Pack'}
                      onClick={() => {
                        deletePack({id: data?.id})
                        setShowModal(false)
                        props.setShowModal('')
                      }}/>
          </div>
      </div>}
    </>
  )
}