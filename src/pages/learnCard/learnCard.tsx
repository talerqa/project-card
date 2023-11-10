import { useState } from "react";

import { useParams } from "react-router-dom";

import s from "./learnCard.module.scss";

import { RadioGroup } from "@/components";
import { BackToPage } from "@/components/common/backToPage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Page } from "@/components/ui/page";
import { Typography } from "@/components/ui/typography";
import {
  useGetDeckQuery,
  useLearnCardQuery,
  useSaveGradeCardMutation,
} from "@/services/decks";

export const LearnCard = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [value, setValue] = useState<number>();

  const { id } = useParams();
  const { data } = useLearnCardQuery({ id });
  const { data: card } = useGetDeckQuery({ id });

  const [setGrade] = useSaveGradeCardMutation();

  return (
    <Page className={s.deck}>
      <BackToPage className={s.backToDecks} />
      <Card className={s.card}>
        <Typography variant={"large"} as={"p"} className={s.title}>
          Learn ${card?.name}
        </Typography>
        <div className={s.questionBlock}>
          <Typography
            variant={"subtitle1"}
            as={"span"}
            className={s.questionTitle}
          >
            Question:
          </Typography>
          <Typography variant={"body1"} as={"span"}>
            {` ${data?.question}`}
          </Typography>
        </div>
        <Typography variant={"body2"} as={"span"} className={s.numberAttempts}>
          number of attempts {data?.shots}
        </Typography>

        <Button
          type={"button"}
          className={s.button}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          Show Answer
        </Button>

        {showAnswer && (
          <div className={s.showAnswer}>
            {data?.answer}
            <p> Rate Yoursers</p>
            <RadioGroup
              options={[
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5 },
              ]}
              onValueChange={(e: any) => {
                setValue(Number(e));
              }}
            />
            <Button
              type={"button"}
              onClick={() => {
                setShowAnswer(false);
                setGrade({
                  id: data?.id,
                  body: { cardId: data?.id, grade: value },
                });
              }}
            >
              {" "}
              Next Question
            </Button>
          </div>
        )}
      </Card>
    </Page>
  );
};
