import { Outlet, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Toast } from "@/components";
import { Header } from "@/components/ui/header";
import { useAuthMeQuery, useLogoutMutation } from "@/services/auth";

export const Layout = (): JSX.Element => {
  const navigate = useNavigate();
  const { isError } = useAuthMeQuery();
  const [setLogout] = useLogoutMutation({
    fixedCacheKey: "shared-logout",
  });

  let isAuthorized = !isError;

  const onSignInHandler = () => {
    return navigate("/login");
  };

  return (
    <>
      <Header
        isAuth={isAuthorized}
        onSignInHandler={onSignInHandler}
        setLogout={setLogout}
      />
      <Outlet />
      <Toast />
    </>
  );
};
