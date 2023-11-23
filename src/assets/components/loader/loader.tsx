import s from "./loader.module.scss";

type LoaderPropsType = {
  class?: string;
  style?: any;
};

export const Loader = (props: LoaderPropsType) => {
  let containerSizeClass = props.class
    ? s.containerHeight + " " + props.class
    : s.containerHeight;

  return (
    <div
      className={s.loaderContainer + " " + containerSizeClass}
      style={props.style}
    >
      <div className={s.loader}></div>
    </div>
  );
};
