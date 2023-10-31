import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import s from "./confirmationPage.module.scss";

import { Card } from "@/components/ui/card";
import { Page } from "@/components/ui/page";
import { useVerifyEmailMutation } from "@/services/auth";
import { Typography } from "@/components/ui/typography";

export const Confirmation = () => {
  let { code } = useParams();
  const [verifyEmail, { isLoading, isSuccess }] = useVerifyEmailMutation();

  const confirmEmailHandler = () => {
    if (!code) return;
    verifyEmail({ code });
  };

  return (
    <Page>
      {isSuccess ? (
        <Card className={s.modal}>
          <Typography variant="h2" as="h2">
            Completed. You can sign in now.
          </Typography>
        </Card>
      ) : (
        <Card className={s.modal}>
          <Typography variant="h2" as="h2">
            Click the button to verify your email.
          </Typography>
          <Button
            disabled={isLoading}
            type="button"
            onClick={confirmEmailHandler}
          >
            Verify email
          </Button>
        </Card>
      )}
    </Page>
  );
};
