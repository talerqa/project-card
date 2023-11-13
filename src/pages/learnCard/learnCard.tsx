import { useState } from "react";

import { useParams } from "react-router-dom";

import s from "./learnCard.module.scss";

import { Loader } from "@/assets/components/loader";
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

  const { data, isLoading } = useLearnCardQuery({ id });
  const { data: card } = useGetDeckQuery({ id });
  const [setGrade] = useSaveGradeCardMutation();

  if (isLoading) return <Loader />;

  return (
    <Page className={s.deck}>
      <BackToPage className={s.backToDecks} />
      <Card className={s.card}>
        <Typography variant={"large"} as={"p"} className={s.title}>
          Learn {card?.name}
        </Typography>
        <div className={s.questionBlock}>
          <Typography
            variant={"subtitle1"}
            as={"span"}
            className={s.questionTitle}
          >
            Question:
          </Typography>
          <Typography variant={"body1"} as={"span"} className={s.questionText}>
            {` ${data?.question}`}
          </Typography>{" "}
        </div>
        <img src={data?.questionImg} alt="" className={s.image} />
        <Typography variant={"body2"} as={"span"} className={s.numberAttempts}>
          Number of attempts {data?.shots}
        </Typography>

        {showAnswer ? (
          <div className={s.showAnswer}>
            <Typography variant={"subtitle1"} as={"p"}>
              Answer:{" "}
              <Typography
                variant={"body1"}
                as={"span"}
                className={s.answerText}
              >
                {data?.answer}
              </Typography>
            </Typography>
            <img src={data?.answerImg} alt="" className={s.image} />
            <Typography variant={"subtitle1"} as={"p"}>
              {" "}
              Rate Yourself:
            </Typography>
            <RadioGroup
              options={[
                { key: "Did not know", value: 1 },
                { key: "Forgot", value: 2 },
                { key: "A lot of though", value: 3 },
                { key: "Confused", value: 4 },
                { key: "Knew the answer", value: 5 },
              ]}
              onValueChange={(e: string) => {
                setValue(Number(e));
              }}
            />
            <Button
              type={"button"}
              className={s.buttonNextQuestion}
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
        ) : (
          <Button
            type={"button"}
            className={s.button}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            Show Answer
          </Button>
        )}
      </Card>
    </Page>
  );
};
