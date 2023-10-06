import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Inputs } from "@/components/ui/inputs";

type FormValues = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(3, "Password mus be at least 3 characters"),
  rememberMe: z.boolean().optional().default(false),
});

export const LoginForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: FormValues) => {};

  const {
    field: { value, onChange },
  } = useController({
    name: "rememberMe",
    control,
    defaultValue: false,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Inputs
        {...register("email", { minLength: { value: 4, message: "short" } })}
        label={"email"}
        type={"text"}
        errorMessage={errors.email?.message}
      />
      <Inputs
        {...register("password", { minLength: { value: 4, message: "short" } })}
        label={"password"}
        type={"password"}
        errorMessage={errors.password?.message}
      />
      <input checked={value} onChange={onChange} type="checkbox" />
      <Button type="submit" icon={false}>
        Submit
      </Button>
    </form>
  );
};
