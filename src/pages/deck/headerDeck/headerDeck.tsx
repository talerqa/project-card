import {useNavigate} from "react-router-dom";
import {DeckType, GetResponseTypeCard} from "@/services/decks";
import {Typography} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import s from './headerDeck.module.scss'
import {DropDown, ItemDropDown} from "@/components/ui/dropdown";
import play from "@/assets/img/play.svg";
import edit from "@/assets/img/edit.svg";
import trash from "@/assets/img/trash.svg";
import {TriggerDropDown} from "@/assets/components/triggerDropDown.tsx";
import {DeckModal, ShowModalType} from "@/pages/decks";
import {AuthMeResponseType} from "@/services/auth";
import {Input} from "@/components/ui/inputs";

export type ModalType = '' | 'Delete Card' | 'Edit Card' | 'Learn' |
  'Add New Card'


export type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  showModal: ModalType | ShowModalType
  setShowModal: (value: ModalType | ShowModalType) => void
  deck?: DeckType
  auth?: AuthMeResponseType
  cards?: GetResponseTypeCard
  question: string
  setQuestion: (value: string) => void
}

export const HeaderDeck = (props: Props) => {

  const {
    open,
    setOpen,
    showModal,
    setShowModal,
    deck,
    auth,
    cards,
    question,
    setQuestion
  } = props

  const navigate = useNavigate()

  return <div className={s.blockHeaderDeck}>
    {deck?.userId === auth?.id ?
      <div className={s.informationBlock}>
        <div className={s.leftBlock}>
          <div className={s.blockTitleDeck}>
            <Typography className={s.title}
                        variant={'large'} as={'h2'}
                        children={'My Pack'}/>
            {deck?.cardsCount !== 0 &&
                <>
                    <DropDown className={s.dropDown}
                              align={'end'}
                              children={<div className={s.menu}>
                                <ItemDropDown img={play} title={'Learn'}
                                              onClick={() => navigate(`../decks/${deck?.id}/learn`)}/>
                                <ItemDropDown img={edit} title={'Edit'}
                                              onClick={() => {
                                                setOpen(true)
                                                setShowModal('Edit Pack')
                                              }}/>
                                <ItemDropDown img={trash} title={'Delete'}
                                              onClick={() => {
                                                setOpen(true)
                                                setShowModal('Delete Pack')
                                              }}/>
                              </div>}
                              trigger={<button className={s.trigger}>
                                <TriggerDropDown/>
                              </button>}/>
                </>
            }
          </div>
          {deck?.cover && <img src={deck.cover.toString()} alt="cover-deck"
                               className={s.imageCover}/>}
          <DeckModal
            activeMenu={open}
            setActiveMenu={setOpen}
            item={deck}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        </div>
        {cards?.items.length !== 0 ?
          <Button type={'button'}
                  variant={'primary'}
                  children={'Add New Card'}
                  onClick={() => {
                    setShowModal('Add New Card')
                    setOpen(true)
                  }}
          /> : <></>}
      </div>
      : <div className={s.informationBlock}>
        <div className={s.leftBlock}>
          <Typography className={s.title}
                      variant={'large'} as={'h2'}
                      children={"Friend\'s Pack"}/>
          {deck?.cover && <img src={deck.cover.toString()} alt="cover-deck"
                               className={s.imageCover}/>}
        </div>
        <Button type={'button'}
                variant={'primary'}
                children={'Learn to Pack'}
                onClick={() => navigate(`../decks/${deck?.id}/learn`)}
        />
      </div>}
    <Input
      type="search"
      placeholder="Input search question"
      className={s.searchInput}
      value={question}
      onChange={(event) => {
        setQuestion(event.target.value);
      }}
    />
  </div>

}

