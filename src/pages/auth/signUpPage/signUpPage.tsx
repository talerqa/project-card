import { useNavigate } from "react-router-dom";

import { SignUp } from "@/components/auth/signUp";
import { Page } from "@/components/ui/page";
import { useSignUpMutation } from "@/services/auth";

export const SignUpPage = () => {
  const [signUp, myData] = useSignUpMutation();

  const { data } = myData;

  const navigate = useNavigate();

  if (data) {
    navigate("/confirmation", { state: data });
  }

  return (
    <Page>
      <SignUp onSubmit={signUp} />
    </Page>
  );
};
