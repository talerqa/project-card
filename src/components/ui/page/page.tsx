import React, {ReactNode,} from "react";
import s from "./page.module.scss";


export type PageProps = {
  children?: ReactNode
  className?: string;
}

export const Page: React.FC<PageProps> = (props): JSX.Element => {

  const {children, className} = props

  return (<div className={`${s.pageContainer} ${className}`}>
      {children}
    </div>
  );
}