import {DevTool} from "@hookform/devtools";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {ControlledCheckbox} from "@/components/ui/controlled/";
import {ControlledInput} from "@/components/ui/controlled";
import {Typography} from "@/components/ui/typography";
import {Card} from "@/components/ui/card";
import s from "./signIn.module.scss";

type FormValues = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(3, "Password mus be at least 3 characters"),
  rememberMe: z.boolean().optional().default(false),
});

export const SignIn = () => {
  const {
    control,
    handleSubmit,
  } = useForm<FormValues>({resolver: zodResolver(loginSchema)});

  const onSubmit = (data: FormValues) => {
    return data;
  };

  const className = {
    title: s.title,
    cardBlock: s.cardBlock
  }


  return (<Card className={className.cardBlock}>
      <DevTool control={control}/>
      <Typography variant={'large'} as={'p'} children={'Sign In'}
                  className={className.title}/>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <ControlledCheckbox name={"rememberMe"}
                            label={"remember me"}
                            control={control}/>
        <Button type="submit"
                children={<Typography variant={'subtitle1'} as={'span'}
                                      children={"Submit"}/>}/>
      </form>
    </Card>
  );
};
