import { Header } from "@/components/ui/header";

import { Outlet, useNavigate } from "react-router-dom";

import avatar from "./../../assets/img/avatart-template.png";
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
      <Header
        isAuth={isAuthorized}
        name={"Ivan"}
        avatarImg={avatar}
        email={"j&johnson@gmail.com"}
        onSignInHandler={onSignInHandler}
      />
      <Outlet />
    </>
  );
};
