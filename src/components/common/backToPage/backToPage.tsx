import {Link} from "react-router-dom";
import {ArrowBackSvg} from "@/assets/components/arrowBackSvg.tsx";
import {Typography} from "@/components/ui/typography";
import s from './backToPage.module.scss'


export const BackToPage = ({link}: any) => {
  return <div className={s.backToDecks}>
    <ArrowBackSvg/>
    <Typography variant={'body2'}
                to={link}
                as={Link}
                className={s.textBack}
                children={'Back to Packs List'}/>
  </div>
}