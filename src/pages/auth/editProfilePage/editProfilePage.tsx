import { ToastContainer, toast } from "react-toastify";

import s from "./editProfilePage.module.scss";

import { EditProfile } from "@/components/auth/editProfile";
import { Page } from "@/components/ui/page";
import { useEditProfileMutation } from "@/services";

export const EditProfilePage = () => {
  const [_, { error }] = useEditProfileMutation({
    fixedCacheKey: "shared-edit",
  });

  const notify = (error: string) => toast(error);

  if (error && "data" in error) {
    const message =
      "Ooooppppsss something went wrong. Maybe your name is too long. Try again please";

    notify(message);
  }

  return (
    <Page className={s.editProfilePage}>
      <EditProfile />
      {/* <ToastContainer hideProgressBar={true} /> */}
    </Page>
  );
};
