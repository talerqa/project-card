import {Header} from "@/components/ui/header";
import {Outlet, useNavigate} from "react-router-dom";

export const Layout = (): JSX.Element => {

  const navigate = useNavigate()

  const onSignInHandler = () => {
    return navigate('/login')
  }

  return (<>
    <Header isAuth={false} onSignInHandler={onSignInHandler}/>
    <Outlet/>
  </>)
}