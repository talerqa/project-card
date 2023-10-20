import {DevTool} from "@hookform/devtools";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {ControlledInput} from "@/components/ui/controlled";
import {Typography} from "@/components/ui/typography";
import {Card} from "@/components/ui/card";
import s from "./signUp.module.scss";
import {Link} from "react-router-dom";

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(3, "Password mus be at least 3 characters"),
  confirmPassword: z.string().min(3, "Password mus be at least 3 characters"),
}).refine((data: {
  password: string,
  confirmPassword: string,
}) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignInProps = {
  onSubmit: (data: Omit<FormValues, 'confirmPassword'>) => void
  className?: string
}

export const SignUp = (props: SignInProps): JSX.Element => {
  const {
    control,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitForm = handleSubmit(props.onSubmit)

  return (<Card className={`${s.cardBlock} ${props.className}`}>
      <DevTool control={control}/>
      <Typography variant={'large'} as={'p'} children={'Sign Up'}
                  className={s.title}/>
      <form onSubmit={handleSubmitForm} className={s.form}>
        <ControlledInput name={'email'}
                         type={'text'}
                         control={control}
                         label={'Email'}
                         className={s.inputEmail}
        />
        <ControlledInput name={'password'}
                         type={'password'}
                         control={control}
                         label={'Password'}
                         className={s.inputPassword}/>
        <ControlledInput name={'confirmPassword'}
                         type={'password'}
                         control={control}
                         label={'Confirm Password'}
                         className={s.inputConfirmPassword}/>
        <Button type="submit"
                children={<Typography variant={'subtitle2'}
                                      as={'span'}
                                      children={"Sign Up"}
                />}
                className={s.buttonSubmitForm}
        />
        <Typography variant={'body2'}
                    as={'p'}
                    children={'Already have an account?'}
                    className={s.linkDontHaveAccount}
        />
        <Typography to={'/login'} children={'Sign In'} variant={'body2'}
                    as={Link} className={s.linkSignUp}/>
      </form>
    </Card>
  );
};
