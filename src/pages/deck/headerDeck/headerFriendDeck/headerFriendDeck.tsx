import {useNavigate} from "react-router-dom";
import {DeckType} from "@/services/decks";
import {Typography} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import s from './headerDeck.module.scss'


export const HeaderFriendDeck = ({deck}: { deck?: DeckType }) => {
  const navigate = useNavigate()
  return <div className={s.informationBlock}>
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
  </div>
}

