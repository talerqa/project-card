import { useNavigate } from "react-router-dom";

import { Button } from "../button";
import { Typography } from "../typography";

import s from "./error.module.scss";

export const Error = () => {
  const navigate = useNavigate();

  const onHomePageClick = () => {
    navigate("/");
  };

  return (
    <div className={s.errorContainer}>
      <div className={s.errorImage}></div>
      <Typography variant="h3" as="h3">
        Sorry! Page not found!
      </Typography>
      <Button onClick={onHomePageClick} type="button">
        <Typography variant="h3" as="span">
          Back to home page
        </Typography>
      </Button>
    </div>
  );
};
