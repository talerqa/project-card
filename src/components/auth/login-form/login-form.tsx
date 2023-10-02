import { useForm } from 'react-hook-form'
import {Inputs} from "@/components/ui/inputs";
import {Button} from "@/components/ui/button";

type FormValues = {
  email: string
  password: string
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Inputs {...register('email')} label={'email'}/>
      <Inputs {...register('password')} label={'password'}/>
      <Button type="submit">Submit</Button>
    </form>
  );
}