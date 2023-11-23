import { Outlet, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Toast } from "@/components";
import { Header } from "@/components/ui/header";
import { useAuthMeQuery, useLogoutMutation } from "@/services/auth";

export const Layout = (): JSX.Element => {
  const [setLogout] = useLogoutMutation({
    fixedCacheKey: "shared-logout",
  });

  const { isError } = useAuthMeQuery();

  let isAuthorized = !isError;

  const navigate = useNavigate();

  const onSignInHandler = () => {
    return navigate("/login");
  };

  return (
    <>
      <Header
        onSignInHandler={onSignInHandler}
        setLogout={setLogout}
        isAuthorized={isAuthorized}
      />
      <Outlet />
      <Toast />
    </>
  );
};
