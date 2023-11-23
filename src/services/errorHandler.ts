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

type ErrorData = {
  [key: string]: any;
};

type AuthErrorType = ErrorData | ErrorHandlerType;

export const onAuthQueryStartedErrorToast = async (
  _: any,
  { queryFulfilled }: any,
) => {
  try {
    await queryFulfilled;
  } catch (error) {
    const isError = error as AuthErrorType;

    if (isError.error.data.message) {
      toast.warn(defineMessage(isError.error.data.message));
    } else {
      toast.warn("some error occured");
    }
  }
};

function defineMessage(str: string) {
  if (str.length > 20) {
    var start = str.indexOf(":") + 1;
    var end = str.lastIndexOf(".");

    return str.substring(start, end);
  }

  return str;
}
