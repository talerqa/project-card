import { useNavigate } from "react-router-dom";

import s from "./checkEmail.module.scss";

import { CheckEmailSvg } from "@/assets/components/checkEmailSvg.tsx";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

type CheckEmailProps = {
  className?: string;
};

export const CheckEmail = (props: CheckEmailProps): JSX.Element => {
  const navigate = useNavigate();
  const onLoginNavigateHandler = () => {
    navigate("/login");
  };

  return (
    <Card className={`${s.cardBlock} ${props.className}`}>
      <Typography variant={"large"} as={"p"} className={s.title}>
        Check Email
      </Typography>
      <CheckEmailSvg className={s.img} />
      <Typography
        variant={"body2"}
        as={"p"}
        className={s.sendEmailText}
      >{`We've sent an Email with instructions to ${"example@mail.com"}`}</Typography>
      <Button
        type="button"
        onClick={onLoginNavigateHandler}
        className={s.button}
      >
        {" "}
        <Typography variant={"subtitle2"} as={"span"}>
          Back To Sign In
        </Typography>
      </Button>
    </Card>
  );
};
