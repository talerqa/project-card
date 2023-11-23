import { Navigate } from "react-router-dom";

import { SignIn } from "@/components/auth/signIn";
import { Page } from "@/components/ui/page";
import { LoginArgsType, useLoginMutation } from "@/services/auth";

import "react-toastify/dist/ReactToastify.css";

export const SignInPage = () => {
  const [login, { isSuccess }] = useLoginMutation();

  if (isSuccess) return <Navigate to="/decks" replace={true} />;

  const handleLogin = (params: LoginArgsType) => {
    login(params);
  };

  return (
    <Page>
      <SignIn onSubmit={handleLogin} />
    </Page>
  );
};
