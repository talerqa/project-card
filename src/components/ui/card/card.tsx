import { forwardRef, ReactNode } from "react";

import clsx from "clsx";

import s from "./card.module.scss";

export type CardProps = {
  variant?: string;
  label?: string;
  children?: ReactNode;
  className?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (props, ref): JSX.Element => {
    const { className, children, ...res } = props;

    const classname = {
      card: clsx(s.card, className),
    };

    return (
      <div className={classname.card} ref={ref} {...res}>
        {children}
      </div>
    );
  },
);
