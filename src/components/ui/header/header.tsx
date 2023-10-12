import {ComponentPropsWithoutRef, ElementType, forwardRef,} from "react";
import s from "./header.module.scss";
import {Logo} from "@/assets/components/logo.tsx";
import {Button} from "@/components/ui/button";
import {Avatar} from "@/components/ui/avatar";
import {Typography} from "@/components/ui/typography";
import {
  DropDown,
  ItemDropDown,
  ProfileItemDropDown
} from "@/components/ui/dropdown";
import avatar from "@/assets/img/avatart-template.png";
import person from "@/assets/img/person.svg";
import logout from "@/assets/img/exit.svg";

export type HeaderProps<T extends ElementType = "input"> = {
  isAuth: boolean
  avatarImg?: string
  name?: string,
  email?: string,
  onClick?: () => void
  onSignOutHandler: () => void
  onShowProfileHandler: () => void
  onLogOutHandler: () => void
  label?: string;
  className?: string,
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
      onSignOutHandler,
      onShowProfileHandler,
      onLogOutHandler,
      ...res
    } = props;

    return (<div className={s.headerBlock}>
      <div className={s.container} ref={ref}>
        <Logo className={s.logo}/>
        {isAuth
          ? <DropDown trigger={
            <div className={s.profileInfo}>
              <Typography variant={'subtitle1'} as={'span'}
                          children={name}
                          className={s.text}/>
              <Avatar src={avatarImg}
                      size={'36px'}
                      className={s.img}
                      {...res}/>
            </div>}
                      children={<>
                        <ProfileItemDropDown img={avatar} name={name}
                                             email={email} {...res}/>
                        <ItemDropDown img={person} title={'My Profile'}
                                      onClick={onShowProfileHandler}/>
                        <ItemDropDown img={logout} title={'Sign Out'}
                                      onClick={onSignOutHandler}/></>}
                      align={'end'}/>
          : <Button type={'button'}
                    children={'Sign in'}
                    onClick={onLogOutHandler}/>}
      </div>
    </div>);
  }
);
