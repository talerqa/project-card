import s from "./editProfilePage.module.scss";

import { EditProfile } from "@/components/auth/editProfile";
import { Page } from "@/components/ui/page";

export const EditProfilePage = () => {
  return (
    <Page className={s.editProfilePage}>
      <EditProfile />
    </Page>
  );
};
