import { Page } from "@/components/ui/page";
import { SignUp } from "@/components/auth/signUp";
import { useSignUpMutation } from "@/services/auth";

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation();

  return (
    <Page>
      <SignUp onSubmit={signUp} />
    </Page>
  );
};
