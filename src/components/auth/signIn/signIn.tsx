import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { ControlledCheckbox } from "@/components/ui/controlled/";
import { ControlledInput } from "@/components/ui/controlled";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";

import s from "./signIn.module.scss";

import { Link } from "react-router-dom";

type FormValues = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(3, "Password mus be at least 3 characters"),
  rememberMe: z.boolean().optional().default(false),
});

type SignInProps = {
  onSubmit: (data: FormValues) => void;
  className?: string;
};

export const SignIn = (props: SignInProps): JSX.Element => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitForm = handleSubmit(props.onSubmit);

  return (
    <Card className={`${s.cardBlock} ${props.className}`}>
      <DevTool control={control} />
      <Typography
        variant={"large"}
        as={"p"}
        children={"Sign In"}
        className={s.title}
      />
      <form onSubmit={handleSubmitForm}>
        <ControlledInput
          name={"email"}
          type={"text"}
          control={control}
          label={"Email"}
          className={s.inputEmail}
        />
        <ControlledInput
          name={"password"}
          type={"password"}
          control={control}
          label={"Password"}
          className={s.inputPassword}
        />
        <ControlledCheckbox
          name={"rememberMe"}
          label={"Remember me"}
          control={control}
          className={s.checkBox}
        />
        <Typography
          variant={"body2"}
          as={Link}
          to={"/forgot-password"}
          children={"Forgot Password?"}
          className={s.forgotPassLink}
        />
        <Button
          type="submit"
          children={
            <Typography
              variant={"subtitle2"}
              as={"span"}
              children={"Sign In"}
            />
          }
          className={s.buttonSubmitForm}
        />
        <Typography
          variant={"body2"}
          as={"p"}
          children={"Don't have an account?"}
          className={s.linkDontHaveAccount}
        />
        <Typography
          to={"/sign-up"}
          children={"Sign Up"}
          variant={"body2"}
          as={Link}
          className={s.linkSignUp}
        />
      </form>
    </Card>
  );
};
