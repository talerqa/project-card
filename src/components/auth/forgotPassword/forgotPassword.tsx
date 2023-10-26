import {DevTool} from "@hookform/devtools";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {ControlledInput} from "@/components/ui/controlled";
import {Typography} from "@/components/ui/typography";
import {Card} from "@/components/ui/card";
import s from "./forgotPassword.module.scss";
import {Link} from "react-router-dom";

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type SignInProps = {
  onSubmit: (data: FormValues) => void
  className?: string
}

export const ForgotPassword = (props: SignInProps): JSX.Element => {
  const {
    control,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitForm = handleSubmit(props.onSubmit)

  return (<Card className={`${s.cardBlock} ${props.className}`}>
      <DevTool control={control}/>
      <Typography variant={'large'} as={'p'} children={'Forgot your password?'}
                  className={s.title}/>
      <form onSubmit={handleSubmitForm} className={s.form}>
        <ControlledInput name={'email'}
                         type={'text'}
                         control={control}
                         label={'Email'}
                         className={s.inputEmail}
        />
        <Typography variant={'body2'}
                    as={'p'}
                    children={'Enter your email address and we will send you further instructions'}
                    className={s.enterEmailInstruction}
        />
        <Button type="submit"
                children={<Typography variant={'subtitle2'}
                                      as={'span'}
                                      children={"Send Instructions"}
                />}
                className={s.buttonSubmitForm}
        />
        <Typography variant={'body2'}
                    as={'span'}
                    children={'Did you remember your password?'}
                    className={s.rememberPassword}
        />
        <Typography variant={'link1'} as={Link} to={'/'}
                    children={'Try logging in'}
                    className={s.tryLogging}/>
      </form>
    </Card>
  );
};
