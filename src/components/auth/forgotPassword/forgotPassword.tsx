import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import s from "./forgotPassword.module.scss";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ControlledInput } from "@/components/ui/controlled";
import { Typography } from "@/components/ui/typography";
import { useRecoverPasswordMutation } from "@/services/auth";

type FormValues = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordProps = {
  onSubmit?: (data: FormValues) => void;
  className?: string;
};

export const ForgotPassword = (props: ForgotPasswordProps): JSX.Element => {
  const [recoverPassword, { isLoading, isSuccess }] =
    useRecoverPasswordMutation();

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitForm = (body: { email: string }) => {
    recoverPassword(body);
  };

  return (
    <Card className={`${s.cardBlock} ${props.className}`}>
      {isSuccess ? (
        <Typography variant={"large"} as={"p"} className={s.title}>
          Check your email.
        </Typography>
      ) : (
        <>
          <DevTool control={control} />
          <Typography variant={"large"} as={"p"} className={s.title}>
            Forgot your password?
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitForm)} className={s.form}>
            <ControlledInput
              name={"email"}
              type={"text"}
              control={control}
              label={"Email"}
              className={s.inputEmail}
            />
            <Typography
              variant={"body2"}
              as={"p"}
              className={s.enterEmailInstruction}
            >
              Enter your email address and we will send you further instructions
            </Typography>
            <Button
              type="submit"
              disabled={isLoading}
              className={s.buttonSubmitForm}
            >
              {" "}
              <Typography variant={"subtitle2"} as={"span"}>
                Send Instructions
              </Typography>
            </Button>
          </form>
        </>
      )}

      <Typography variant={"body2"} as={"span"} className={s.rememberPassword}>
        Did you remember your password?
      </Typography>
      <Typography
        variant={"link1"}
        as={Link}
        to={"/login"}
        className={s.tryLogging}
      >
        Try logging in
      </Typography>
    </Card>
  );
};
