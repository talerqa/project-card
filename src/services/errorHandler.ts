import { toast } from "react-toastify";

import { ErrorHandlerType } from "@/services/decks";

export const onQueryStartedErrorToast = async (
  _: any,
  { queryFulfilled }: any,
) => {
  try {
    await queryFulfilled;
  } catch (error: unknown) {
    const isError = error as ErrorHandlerType;

    if (isError.error.status === "FETCH_ERROR") {
      toast.warn("Some Error");
    } else if (isError.error.status === 400) {
      isError.error.data.errorMessages.forEach((error) => {
        toast.warn(error.message);
      });
    }
  }
};
