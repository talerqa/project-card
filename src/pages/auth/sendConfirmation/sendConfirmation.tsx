import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Page } from "@/components/ui/page";
import s from "./sendConfirmation.module.scss";
import { Typography } from "@/components/ui/typography";
import { useResendVerificationMutation } from "@/services/auth";
import { useLocation } from "react-router-dom";
import { VERIFICATION_STRING } from "@/components/auth/signUp";

export const SendConfirmation = () => {
  const {
    state: { id, email },
  } = useLocation();
  const [resendVerification, { isLoading, isSuccess }] =
    useResendVerificationMutation();

  const handleResendVerification = () => {
    const data = {
      html: VERIFICATION_STRING,
      userId: id,
      subject: "",
    };

    resendVerification(data);
  };

  return (
    <Page>
      <Card className={s.modal}>
        {isSuccess ? (
          <div>
            Ok, now please check your email. If you haven&apos;t received the
            letter please contact the support{" "}
          </div>
        ) : (
          <>
            <div className={s.typographyContainer}>
              <Typography variant="body1" as="p">
                We sent a verification email to <span>{email}</span>. Please
                click the link in the email to verify your address.
              </Typography>
              <Typography variant="body1" as="p">
                This will help us protect your account and ensure that you
                receive important notifications.
              </Typography>
              <Typography variant="body1" as="p">
                If you don&apos;t see the email in your inbox, please check your
                spam folder. If you still haven&apos;t received the email, you
                can request a new one below.
              </Typography>
            </div>
            <Button
              disabled={isLoading}
              type="button"
              onClick={handleResendVerification}
            >
              Resend verification letter
            </Button>
          </>
        )}
      </Card>
    </Page>
  );
};
