import {ComponentPropsWithoutRef, ElementType, forwardRef} from "react";
import s from "./header.module.scss";
import {Logo} from "@/assets/components/logo.tsx";
import {Avatar} from "@/components/ui/avatar";
import {Typography} from "@/components/ui/typography";
import signout from "@/assets/img/exit.svg";
import {Button} from "@/components/ui/button";
import {
  DropDown,
  ItemDropDown,
  ProfileItemDropDown,
} from "@/components/ui/dropdown";
import {useLogoutMutation} from "@/services/auth";
import {defaultAva} from "@/assets/defaultAva";
import {useNavigate} from "react-router-dom";

export type HeaderProps<T extends ElementType = "input"> = {
  isAuth: boolean;
  avatarImg?: string;
  name?: string;
  email?: string;
  onClick?: () => void;
  onSignInHandler?: () => void;
  onShowProfileHandler?: () => void;
  onLogOutHandler?: () => void;
  label?: string;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (props, ref): JSX.Element => {
    const {
      avatarImg,
      name,
      email,
      isAuth,
      label,
      className,
      onClick,
      onSignInHandler,
      onShowProfileHandler,
      onLogOutHandler,
      ...res
    } = props;

    const [logout] = useLogoutMutation();

    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
    };

    const handleRedirectToEditPage = () => {
      navigate("/edit-profile");
    };

    return (
      <div className={s.headerBlock}>
        <div className={s.container} ref={ref}>
          <Logo className={s.logo} />
          {isAuth ? (
            <DropDown
              trigger={
                <div className={s.profileInfo}>
                  <Typography
                    variant={"subtitle1"}
                    as={"span"}
                    children={name}
                    className={s.text}
                  />
                  <Avatar
                    src={defaultAva}
                    size={"36px"}
                    className={s.img}
                    {...res}
                  />
                </div>
              }
              children={
                <>
                  <ProfileItemDropDown
                    img={defaultAva}
                    name={name}
                    email={email}
                    {...res}
                  />
                  <ItemDropDown
                    img={defaultAva}
                    title={"My Profile"}
                    onClick={handleRedirectToEditPage}
                  />
                  <ItemDropDown
                    img={signout}
                    title={"Sign Out"}
                    onClick={handleLogout}
                  />
                </>
              }
              align={"end"}
            />
          ) : (
            <Button
              type={"button"}
              children={"Sign in"}
              onClick={onSignInHandler}
            />
          )}
        </div>
      </div>
    );
  }
);
