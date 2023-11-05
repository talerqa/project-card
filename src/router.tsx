import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import {Layout} from "@/pages/layout/layout.tsx";

import {useAuthMeQuery} from "./services/auth";

import {Decks} from "@/pages/decks";
import {Deck} from "@/pages/deck";
import {LearnCard} from "@/pages/learnCard";
import {
  CheckEmailPage,
  CreateNewPasswordPage,
  ForgotPasswordPage,
  SendConfirmation,
  SignInPage,
  SignUpPage,
} from "@/pages";
import {Confirmation} from "@/pages/auth/sendConfirmation/confirmation";
import { EditProfilePage } from "./pages/auth/EditProfilePage/editProfilePage";

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
        element: <SignUpPage/>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage/>,
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
        element: <Navigate to={'/decks'}/>,
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
        element: <LearnCard/>,
      }
    ],
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes/>,
    children: privateRoutes,
    errorElement: <div>Error404</div>
  },
  ...publicRoutes,
  {
    path: "*",
    element: <Navigate to="/error404" />,

  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

function PrivateRoutes() {
  const { isLoading, isError } = useAuthMeQuery();

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        Loading...
      </div>
    );

  const isAuthenticated = !isError;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
