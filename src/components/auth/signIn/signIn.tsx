import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import s from "./signIn.module.scss";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ControlledCheckbox,
  ControlledInput,
} from "@/components/ui/controlled";
import { Typography } from "@/components/ui/typography";

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
      <Typography variant={"large"} as={"p"} className={s.title}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmitForm}>
        <ControlledInput
          name={"email"}
          type={"text"}
          control={control}
          placeholder={"test@test.com"}
          label={"Email"}
          className={s.inputEmail}
        />
        <ControlledInput
          name={"password"}
          type={"password"}
          control={control}
          placeholder={"test"}
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
          className={s.forgotPassLink}
        >
          Forgot Password?
        </Typography>
        <Button type="submit" className={s.buttonSubmitForm}>
          <Typography variant={"subtitle2"} as={"span"}>
            Sign In
          </Typography>
        </Button>
        <Typography
          variant={"body2"}
          as={"p"}
          className={s.linkDontHaveAccount}
        >
          Don&#39;t have an account?
        </Typography>
        <Typography
          to={"/sign-up"}
          variant={"body2"}
          as={Link}
          className={s.linkSignUp}
        >
          Sign Up
        </Typography>
      </form>
    </Card>
  );
};
