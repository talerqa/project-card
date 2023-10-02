import {useForm} from 'react-hook-form'
import {Inputs} from "@/components/ui/inputs";
import {Button} from "@/components/ui/button";

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const {register, handleSubmit} = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {

    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Inputs {...register('email')} label={'email'} type={'text'}/>
      <Inputs {...register('password')} label={'password'} type={'password'}/>
      <Button type="submit" icon={false}>Submit</Button>
    </form>
  );
}