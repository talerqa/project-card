import {ComponentPropsWithoutRef, ElementType, ReactNode} from "react"
import s from './typography.module.scss'

export type TypographyProps<T extends ElementType> = {
  variant:
    | "large"
    | "h1"
    | "h2"
    | "h3"
    | "body1"
    | "body2"
    | "subtitle1"
    | "subtitle2"
    | "caption"
    | "overline"
    | "link1"
    | "link2"
    | "error";
  as: T;
  children?:  string | number | ReactNode
  className?: string;
} & ComponentPropsWithoutRef<T>;

export const Typography = <T extends ElementType>(
  props: TypographyProps<T> & 
  Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>,
) => {
  const { variant, className, as: Component = 'div'  , ...rest } = props;

  return <Component className={`${s[variant]} ${className}`} {...rest}  />;
};
