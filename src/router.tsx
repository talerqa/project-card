import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import {SignInPage} from "@/pages/auth/signInPage";
import {SignUpPage} from "@/pages/auth/signUpPage";
import {Layout} from "@/pages/layout/layout.tsx";
import {Deck} from "@/pages/deck/deck.tsx";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/login",
        element: <SignInPage/>,
      },
      {
        path: "/sign-up",
        element: <SignUpPage/>,
      },
      {
        path: "/forgot-password",
        element: <div>Forgot Password</div>,
      },
      // {
      //   path: '/check-email',
      //   element: <div>Forgot Password</div>
      // }
    ],
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Deck/>,
      },
    ]
  },
];

const errorRoutes: RouteObject[] = [
  {
    path: "/error404",
    element: <div>Error404</div>,
  },
];

const router = createBrowserRouter([
  {
    element: <PrivateRoutes/>,
    children: privateRoutes,
  },
  ...publicRoutes,
  ...errorRoutes,
  {
    path: "*",
    element: <Navigate to="/error404"/>,
  },
]);

export const Router = () => {
  return <RouterProvider router={router}/>;
};

function PrivateRoutes() {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>;
}
