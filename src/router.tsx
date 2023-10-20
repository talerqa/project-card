import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import {useGetDecksQuery} from "./services/base-api";

import {Layout} from "@/pages/layout/layout.tsx";
import {SignInPage} from "@/pages/auth/signInPage";
import {SignUpPage} from "@/pages/auth/signUpPage";

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: "/login",
        element: <SignInPage/>,
      },
      {
        path: '/sign-up',
        element: <SignUpPage/>,
      },
      {
        path: '/forgot-password',
        element: <div>Forgot Password</div>
      },
      // {
      //   path: '/check-email',
      //   element: <div>Forgot Password</div>
      // }
    ]
  }
];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <div>Hello</div>,
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
  const result = useGetDecksQuery();

  console.log(result);

  return <RouterProvider router={router}/>;
};

function PrivateRoutes() {
  const isAuthenticated = false;

  return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>;
}
