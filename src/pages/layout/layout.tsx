import { Header } from "@/components/ui/header";

import { Outlet, useNavigate } from "react-router-dom";

import avatar from "./../../assets/img/avatart-template.png";
export const Layout = (): JSX.Element => {
  const navigate = useNavigate();

  const onSignInHandler = () => {
    return navigate("/login");
  };

  return (
    <>
      <Header
        isAuth={false}
        name={"Ivan"}
        avatarImg={avatar}
        email={"j&johnson@gmail.com"}
        onSignInHandler={onSignInHandler}
      />
      <Outlet />
    </>
  );
};
