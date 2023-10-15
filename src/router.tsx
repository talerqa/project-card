import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useGetDecksQuery } from "./services/base-api";

const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <div>Login</div>,
  },
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
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
  ...errorRoutes,
  {
    path: "*",
    element: <Navigate to="/error404" />,
  },
]);

export const Router = () => {
  const result = useGetDecksQuery();

  console.log(result);

  return <RouterProvider router={router} />;
};

function PrivateRoutes() {
  const isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}