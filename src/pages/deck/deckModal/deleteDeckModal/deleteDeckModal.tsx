import {Typography} from "@/components/ui/typography";
import s from './deckDeleteModal.module.scss'
import {Button} from "@/components/ui/button";
import {useDeleteDeckMutation,} from "@/services/decks";

type Props = any
export const DeleteDeckModal = (props: Props) => {

  const {item, closeModalHandler} = props

  const [deletePack] = useDeleteDeckMutation()

  return (<>
      <div className={s.deleteDeckModal}>
        <div className={s.textBlock}>
          <Typography variant={'body1'} className={s.text} as={"p"}>
            Do you really want to remove
            <Typography variant={'subtitle1'}
                        className={s.namePack}
                        as={'span'} children={` ${item.name} ?`}/>
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
                    deletePack({id: item?.id})
                    closeModalHandler()
                  }}/>
        </div>
      </div>
    </>
  )
}