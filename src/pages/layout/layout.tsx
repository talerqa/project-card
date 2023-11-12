import { Outlet, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Toast } from "@/components";
import { Header } from "@/components/ui/header";
import { useAuthMeQuery } from "@/services/auth";

export const Layout = (): JSX.Element => {
  const navigate = useNavigate();
  const { isError } = useAuthMeQuery();

  let isAuthorized = !isError;

  const onSignInHandler = () => {
    return navigate("/login");
  };

  return (
    <>
      <Header isAuth={isAuthorized} onSignInHandler={onSignInHandler} />
      <Outlet />
      <Toast />
    </>
  );
};
