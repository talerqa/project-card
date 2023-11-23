import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";

import { UnwrapPromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { useNavigate } from "react-router-dom";

import s from "./header.module.scss";

import { Logo } from "@/assets/components/logo.tsx";
import { defaultAva } from "@/assets/defaultAva";
import signout from "@/assets/img/exit.svg";
import { Button } from "@/components";
import { Avatar } from "@/components/ui/avatar";
import {
  DropDown,
  ItemDropDown,
  ProfileItemDropDown,
} from "@/components/ui/dropdown";
import { Typography } from "@/components/ui/typography";
import { baseApi } from "@/services/base-api.ts";
import { useAppDispatch, useAppSelector } from "@/services/store";

export type HeaderProps<T extends ElementType = "input"> = {
  onSignInHandler?: () => void;
  setLogout: () => UnwrapPromise<any>;
  isAuthorized: boolean;
} & ComponentPropsWithoutRef<T>;

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (props, ref): JSX.Element => {
    const { onSignInHandler, setLogout, isAuthorized, ...res } = props;

    const dispatch = useAppDispatch();

    const { name, email, avatar } = useAppSelector(
      (state) => state.userReducer,
    );

    const navigate = useNavigate();

    const handleLogout = async () => {
      await setLogout();
      await dispatch(baseApi.util.resetApiState());
    };

    const handleRedirectToEditPage = () => {
      navigate("/edit-profile");
    };

    return (
      <div className={s.headerBlock}>
        <div className={s.container} ref={ref}>
          <Logo className={s.logo} />
          {isAuthorized && name && (
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
          )}
          {!name && (
            <Button type={"button"} onClick={onSignInHandler}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    );
  },
);
