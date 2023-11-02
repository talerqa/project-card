import s from './learnCard.module.scss'
import {Page} from "@/components/ui/page";
import {Card} from "@/components/ui/card";
import {Typography} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {useGetDeckQuery, useLearnCardQuery} from "@/services/decks";
import {useParams} from "react-router-dom";
import {useState} from "react";

export const LearnCard = () => {

  const [showAnswer, setShowAnswer] = useState(false)

  const {id} = useParams()
  const {data} = useLearnCardQuery({id})
  const {data: card} = useGetDeckQuery({id})




  return <Page className={s.deck}>
    <Card className={s.card}>
      <Typography variant={'large'}
                  as={'p'}
                  className={s.title}
                  children={`Learn ${card?.name}`}/>
      <div className={s.questionBlock}>
        <Typography variant={'subtitle1'}
                    as={'span'}
                    className={s.questionTitle}
        >
          Question:
        </Typography>
        <Typography variant={'body1'} as={'span'}>
          {` ${data?.question}`}
        </Typography>
      </div>
      <Typography variant={'body2'}
                  as={'span'}
                  className={s.numberAttempts}
      >
        number of attempts {data?.shots}
      </Typography>

      <Button type={'button'} className={s.button}
        onClick={()=>setShowAnswer(!showAnswer)}
      >
        Show Answer
      </Button>

      {showAnswer && <div className={s.showAnswer}>
          sdfdsfsdfsdfsdfsdfsd
      </div>
      }


    </Card>
  </Page>
}