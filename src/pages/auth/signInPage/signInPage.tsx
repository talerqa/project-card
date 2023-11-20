import { Navigate } from "react-router-dom";

import { Loader } from "@/assets/components/loader";
import { SignIn } from "@/components/auth/signIn";
import { Page } from "@/components/ui/page";
import {
  LoginArgsType,
  useAuthMeQuery,
  useLoginMutation,
} from "@/services/auth";

export const SignInPage = () => {
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();
  const { isLoading: authLoading, isError: authError } = useAuthMeQuery();

  console.log(isError);

  if (authLoading || isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <Loader />
      </div>
    );

  if (!authError || isSuccess) return <Navigate to="/decks" replace={true} />;

  const handleLogin = (params: LoginArgsType) => {
    login(params);
  };

  return (
    <Page>
      <SignIn onSubmit={handleLogin} />
    </Page>
  );
};
