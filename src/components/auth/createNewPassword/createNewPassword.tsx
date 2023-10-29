import {DevTool} from "@hookform/devtools";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {ControlledInput} from "@/components/ui/controlled";
import {Typography} from "@/components/ui/typography";
import {Card} from "@/components/ui/card";
import s from "./createNewPassword.module.scss";

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  password: z.string().min(3, "Password must be at least 3 characters"),
});

type CreateNewPasswordProps = {
  onSubmit: (data: FormValues) => void
  className?: string
}

export const CreateNewPassword = (props: CreateNewPasswordProps): JSX.Element => {
  const {
    control,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitForm = handleSubmit(props.onSubmit)

  return (<Card className={`${s.cardBlock} ${props.className}`}>
      <DevTool control={control}/>
      <Typography variant={'large'} as={'p'} children={'Create new password'}
                  className={s.title}/>
      <form onSubmit={handleSubmitForm} className={s.form}>
        <ControlledInput name={'password'}
                         type={'password'}
                         control={control}
                         label={'Password'}
                         className={s.inputPassword}
        />
        <Typography variant={'body2'}
                    as={'p'}
                    children={'Create new password and we will send you further instructions to email'}
                    className={s.createNewPassword}
        />
        <Button type="submit"
                onClick={()=>{}}
                children={<Typography variant={'subtitle2'}
                                      as={'span'}
                                      children={"Create New Password"}
                />}
                className={s.buttonSubmitForm}
        />
      </form>
    </Card>
  );
};
