import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { ErrorPage } from "./pages/error/errorPage";
import { useAuthMeQuery } from "./services/auth";

import { Loader } from "@/assets/components/loader";
import {
  CheckEmailPage,
  CreateNewPasswordPage,
  EditProfilePage,
  ForgotPasswordPage,
  SendConfirmation,
  SignInPage,
  SignUpPage,
} from "@/pages";
import { Confirmation } from "@/pages/auth/sendConfirmation/confirmation";
import { Deck } from "@/pages/deck";
import { Decks } from "@/pages/decks";
import { Layout } from "@/pages/layout/layout.tsx";
import { LearnCard } from "@/pages/learnCard";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/create-password/:token",
        element: <CreateNewPasswordPage/>,
      },
      {
        path: "/check-email",
        element: <CheckEmailPage/>,
      },
      {
        path: "/confirmation",
        element: <SendConfirmation/>,
      },
      {
        path: "/confirm-email/:code",
        element: <Confirmation/>,
      },
      {
        path: "/edit-profile",
        element: <EditProfilePage />,
      },
    ],
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <Navigate to={"/decks"} />,
      },
      {
        path: "/decks",
        element: <Decks />,
      },
      {
        path: "/decks/:id/cards",
        element: <Deck />,
      },
      {
        path: "/decks/:id/learn",
        element: <LearnCard />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: privateRoutes,
    errorElement: <ErrorPage />,
  },
  ...publicRoutes,
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

function PrivateRoutes() {
  const { isLoading, isError } = useAuthMeQuery();

  if (isLoading) return <Loader />;

  const isAuthenticated = !isError;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
