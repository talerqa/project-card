import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import s from "./signUp.module.scss";

import { Button, Card, ControlledInput, Typography } from "@/components";

type FormValues = z.infer<typeof loginSchema>;

export const VERIFICATION_STRING =
  '<b>Hello, ##name##!</b><br/>Please confirm your email by clicking on the link below:<br/><a href="http://localhost:3000/confirm-email/##token##">Confirm email</a>. If it doesn\'t work, copy and paste the following link in your browser:<br/>http://localhost:3000/confirm-email/##token##';

const loginSchema = z
  .object({
    name: z.string(),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(3, "Password mus be at least 3 characters"),
    confirmPassword: z.string().min(3, "Password mus be at least 3 characters"),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    },
  );

type SignInProps = {
  onSubmit: (
    data: Omit<FormValues, "confirmPassword"> & {
      sendConfirmationEmail: boolean;
      html: string;
    },
  ) => void;
  className?: string;
};

export const SignUp = (props: SignInProps): JSX.Element => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitForm = (
    data: Omit<FormValues, "confirmPassword"> & { confirmPassword?: string },
  ) => {
    delete data.confirmPassword;
    props.onSubmit({
      ...data,
      sendConfirmationEmail: true,
      html: VERIFICATION_STRING,
    });
  };

  return (
    <Card className={`${s.cardBlock} ${props.className}`}>
      <DevTool control={control} />
      <Typography variant={"large"} as={"p"} className={s.title}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={s.form}>
        <ControlledInput
          name={"name"}
          type={"text"}
          control={control}
          label={"Name"}
          className={s.inputEmail}
        />
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
        <ControlledInput
          name={"confirmPassword"}
          type={"password"}
          control={control}
          label={"Confirm Password"}
          className={s.inputConfirmPassword}
        />
        <Button type="submit" className={s.buttonSubmitForm}>
          <Typography variant={"subtitle2"} as={"span"}>
            Sign Up
          </Typography>
        </Button>
        <Typography
          variant={"body2"}
          as={"p"}
          className={s.linkDontHaveAccount}
        >
          Already have an account?
        </Typography>
        <Typography
          to={"/login"}
          variant={"body2"}
          as={Link}
          className={s.linkSignUp}
        >
          Sign In
        </Typography>
      </form>
    </Card>
  );
};
