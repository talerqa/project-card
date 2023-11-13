import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

import s from "./createNewPassword.module.scss";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ControlledInput } from "@/components/ui/controlled";
import { Typography } from "@/components/ui/typography";
import { useResetPasswordMutation } from "@/services/auth";

type FormValues = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  password: z.string().min(3, "Password must be at least 3 characters"),
});

type CreateNewPasswordProps = {
  onSubmit: (data: FormValues) => void;
  className?: string;
};

export const CreateNewPassword = (
  props: CreateNewPasswordProps,
): JSX.Element => {
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
  let { token } = useParams();

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitForm = ({ password }: any) => {
    token && resetPassword({ token: token, password: password });
  };

  return (
    <Card className={`${s.cardBlock} ${props.className}`}>
      {isSuccess ? (
        <Typography variant={"large"} as={"p"} className={s.title}>
          Your password was changed you can sign in now.
        </Typography>
      ) : (
        <>
          <DevTool control={control} />
          <Typography variant={"large"} as={"p"} className={s.title}>
            Create new password
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitForm)} className={s.form}>
            <ControlledInput
              name={"password"}
              type={"password"}
              control={control}
              label={"Password"}
              className={s.inputPassword}
            />
            <Typography
              variant={"body2"}
              as={"p"}
              className={s.createNewPassword}
            >
              Create new password and we will send you further instructions to
              email
            </Typography>
            <Button
              type="submit"
              disabled={isLoading}
              className={s.buttonSubmitForm}
            >
              <Typography variant={"subtitle2"} as={"span"}>
                Create New Password
              </Typography>
            </Button>
          </form>
        </>
      )}
    </Card>
  );
};
