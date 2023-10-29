import { Navigate } from "react-router-dom";

import { SignUp } from "@/components/auth/signUp";
import { Page } from "@/components/ui/page";
import { useSignUpMutation } from "@/services/auth";

export const SignUpPage = () => {
  const [signUp, { data }] = useSignUpMutation();

  if (data) {
    return <Navigate to="/login" />;
  }

  return (
    <Page>
      <SignUp onSubmit={signUp} />
    </Page>
  );
};
