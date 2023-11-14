import s from "./loader.module.scss";

type LoaderPropsType = {
  class?: string;
};

export const Loader = (props: LoaderPropsType) => {
  let containerSizeClass = props.class ? props.class : s.containerHeight;

  return (
    <div className={s.loaderContainer + " " + containerSizeClass}>
      <div className={s.loader}></div>
    </div>
  );
};
