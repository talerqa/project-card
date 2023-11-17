import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";

import { UnwrapPromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { useNavigate } from "react-router-dom";

import s from "./header.module.scss";

import { Logo } from "@/assets/components/logo.tsx";
import { defaultAva } from "@/assets/defaultAva";
import signout from "@/assets/img/exit.svg";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropDown,
  ItemDropDown,
  ProfileItemDropDown,
} from "@/components/ui/dropdown";
import { Typography } from "@/components/ui/typography";
import { useAppSelector } from "@/services/store";

export type HeaderProps<T extends ElementType = "input"> = {
  isAuth: boolean;
  onClick?: () => void;
  onSignInHandler?: () => void;
  onShowProfileHandler?: () => void;
  onLogOutHandler?: () => void;
  label?: string;
  className?: string;
  setLogout: () => UnwrapPromise<any>;
} & ComponentPropsWithoutRef<T>;

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (props, ref): JSX.Element => {
    const {
      isAuth,
      label,
      className,
      onClick,
      onSignInHandler,
      onShowProfileHandler,
      onLogOutHandler,
      setLogout,
      ...res
    } = props;

    const { name, email, avatar } = useAppSelector(
      (state) => state.userReducer,
    );

    const navigate = useNavigate();

    const handleLogout = async () => {
      await setLogout();
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
                    className={s.text}
                  >
                    {name}
                  </Typography>
                  <Avatar
                    src={avatar || defaultAva}
                    size={"36px"}
                    className={s.img}
                    {...res}
                  />
                </div>
              }
              align={"end"}
            >
              <>
                <ProfileItemDropDown
                  img={avatar || defaultAva}
                  name={name}
                  email={email}
                  {...res}
                />
                <ItemDropDown
                  img={avatar || defaultAva}
                  title={"My Profile"}
                  onClick={handleRedirectToEditPage}
                />
                <ItemDropDown
                  img={signout}
                  title={"Sign Out"}
                  onClick={handleLogout}
                />
              </>
            </DropDown>
          ) : (
            <Button type={"button"} onClick={onSignInHandler}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    );
  },
);
