import {DevTool} from "@hookform/devtools";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {ControlledCheckbox} from "@/components/ui/controlled/";
import {ControlledInput} from "@/components/ui/controlled";
import {Typography} from "@/components/ui/typography";

type FormValues = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(3, "Password mus be at least 3 characters"),
  rememberMe: z.boolean().optional().default(false),
});

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
  } = useForm<FormValues>({resolver: zodResolver(loginSchema)});

  const onSubmit = (data: FormValues) => {
    return data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control}/>
      <ControlledInput name={'email'} type={'text'} control={control}/>
      <ControlledInput name={'password'} type={'password'} control={control}/>
      <ControlledCheckbox name={"rememberMe"} label={"remember me"}
                          control={control}/>
      <Button type="submit"
              children={<Typography variant={'subtitle1'} as={'span'}
                                    children={"Submit"}/>}/>
    </form>
  );
};
