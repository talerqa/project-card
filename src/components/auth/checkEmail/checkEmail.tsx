import {Button} from "@/components/ui/button";
import {Typography} from "@/components/ui/typography";
import {Card} from "@/components/ui/card";
import s from "./checkEmail.module.scss";
import {CheckEmailSvg} from "@/assets/components/checkEmailSvg.tsx";
import {useNavigate} from "react-router-dom";

type CheckEmailProps = {
  className?: string
}

export const CheckEmail = (props: CheckEmailProps): JSX.Element => {

  const navigate = useNavigate()
  const onLoginNavigateHandler = () => {
    navigate('/login')
  }

  return (<Card className={`${s.cardBlock} ${props.className}`}>
      <Typography variant={'large'} as={'p'} children={'Check Email'}
                  className={s.title}/>
      <CheckEmailSvg className={s.img}/>
      <Typography variant={'body2'}
                  as={'p'}
                  children={`We've sent an Email with instructions to ${'example@mail.com'}`}
                  className={s.sendEmailText}
      />
      <Button type="button"
              onClick={onLoginNavigateHandler}
              children={<Typography variant={'subtitle2'}
                                    as={'span'}
                                    children={"Back To Sign In"}
              />}
              className={s.button}
      />
    </Card>
  );
};
