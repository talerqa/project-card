import {Page} from "@/components/ui/page";
import {CreateNewPassword} from "@/components/auth/checkEmail";

export const CreateNewPasswordPage = () => {
  return (<Page>
      <CreateNewPassword onSubmit={()=>{}}/>
    </Page>
  )
}