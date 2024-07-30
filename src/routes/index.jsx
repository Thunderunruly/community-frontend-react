import { Navigate } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import UserLayout from "../layouts/UserLayut";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import ErrorPage from "../pages/error";
import ProfilePage from "../pages/profile";
import FrontendProvider from "../contexts/FrontendContext";
import CanvasLayout from "../layouts/CanvasLayout";
import ReactPage from "../pages/generate/frontend/react";
import InitialPage from "../pages/generate/frontend/init";

const routes = [
  {
    path: "/",
    Component: BasicLayout,
    children: [
      {
        path: "",
        Component: HomePage
      },
    ]
  },
  {
    path: "user/:username",
    Component: UserLayout,
    children: [
      {
        path: "",
        element: <Navigate to={"profile"} replace/>
      },
      {
        path: "profile",
        Component: ProfilePage
      }
    ]
  },
  {
    path: "frontend",
    Component: FrontendProvider,
    children: [
      {
        path: "",
        element: <Navigate to={"init"} replace/>
      },
      {
        path: "init",
        Component: InitialPage
      },
      {
        path: "create",
        Component: CanvasLayout,
        children: [
          {
            path: "react",
            Component: ReactPage
          }
        ]
      }
    ]
  },
  {
    path: "login",
    Component: LoginPage,
  },
  {
    path: "error/:status",
    Component: ErrorPage
  },
  {
    path: "*",
    element: <Navigate to={"/error/404"}/>
  }
];

export default routes;