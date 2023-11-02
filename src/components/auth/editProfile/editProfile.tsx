import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

type EditProfilePropsType = {};

export const EditProfile = (props: EditProfilePropsType): JSX.Element => {
  return (
    <Card>
      <Typography variant={"large"} as={"p"}>
        Personal Information
      </Typography>
    </Card>
  );
};
