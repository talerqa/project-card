import { ComponentProps } from "react";

import s from "./avatar.module.scss";

export type AvatarProps = {
  variant?: string;
  className?: string;
  src: ComponentProps<"img">["src"];
  size?: ComponentProps<"img">["width"];
};

export const Avatar = (props: AvatarProps): JSX.Element => {
  const { className, src, size, ...res } = props;

  return (
    <img
      className={s.avatar}
      alt={"avatar"}
      src={src}
      width={size}
      height={size}
      {...res}
    />
  );
};
