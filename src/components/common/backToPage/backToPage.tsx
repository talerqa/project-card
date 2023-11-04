import {useNavigate} from "react-router-dom";
import {ArrowBackSvg} from "@/assets/components/arrowBackSvg.tsx";
import {Typography} from "@/components/ui/typography";
import s from './backToPage.module.scss'

export const BackToPage = ({className}: { className?: string }) => {
  const navigate = useNavigate();
  return <button className={`${s.backToDecks} ${className}`}
                 onClick={() => navigate(-1)}>
    <ArrowBackSvg/>
    <Typography variant={'body2'}
                as={'span'}
                className={s.textBack}
                children={'Back to Packs List'}/>
  </button>
}