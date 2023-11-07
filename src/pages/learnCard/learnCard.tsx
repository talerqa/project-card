import s from './learnCard.module.scss'
import {Page} from "@/components/ui/page";
import {Card} from "@/components/ui/card";
import {Typography} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {
  useGetDeckQuery,
  useLearnCardQuery,
  useSaveGradeCardMutation
} from "@/services/decks";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {BackToPage} from "@/components/common/backToPage";

export const LearnCard = () => {

  const [showAnswer, setShowAnswer] = useState(false)

  const {id} = useParams()
  const {data} = useLearnCardQuery({id})
  const {data: card} = useGetDeckQuery({id})
  const [setGrade] = useSaveGradeCardMutation()


  return <Page className={s.deck}>
    <BackToPage className={s.backToDecks}/>
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
              onClick={() => setShowAnswer(!showAnswer)}
      >
        Show Answer
      </Button>

      {showAnswer && <div className={s.showAnswer}>
        {data?.answer}
          <button onClick={() => {
            console.log(data?.id)
            console.log(data?.deckId)
            setGrade({id: data?.id, body: {cardId: data?.id, grade: 5}})
          }}>+
          </button>
      </div>
      }


    </Card>
  </Page>
}