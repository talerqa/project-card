import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Loader } from "@/assets/components/loader";
import { SignIn } from "@/components/auth/signIn";
import { Page } from "@/components/ui/page";
import {
  LoginArgsType,
  useAuthMeQuery,
  useLoginMutation,
} from "@/services/auth";

import "react-toastify/dist/ReactToastify.css";

type ErrorData = {
  [key: string]: string;
};

export const SignInPage = () => {
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  const { isLoading: authLoading, isError: authError } = useAuthMeQuery();

  const notify = (error: string) => toast(error);

  if (error && "data" in error) {
    const message = (error.data as ErrorData)?.message;

    notify(message);
  }

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
      <ToastContainer />
    </Page>
  );
};
