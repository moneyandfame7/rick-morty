import HomePage from "../pages/HomePage";
import CharacterPage from "../pages/CharacterPage/CharacterPage";
import EpisodePage from "../pages/EpisodePage";
import React, { createRef, RefObject } from "react";
import NotFoundPage from "../pages/NotFoundPage";
import { InfoAboutCharacterPage } from "../pages/InfoAboutCharacterPage";
import InfoAboutEpisodePage from "../pages/InfoAboutEpisodePage";
import FavoritePage from "../pages/FavoritePage";
import { CreateCharacterPage } from "../pages/CreateCharacterPage";
import { SignupPage } from "../pages/SignupPage";
import { LoginPage } from "../pages/LoginPage";
import { WelcomePage } from "../pages/WelcomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { LogoutPage } from "../pages/LogoutPage";

interface IRoutesConfig {
  index?: boolean;
  path: string;
  element: React.ReactNode | any;
  id: number;
  exact?: boolean;
  nodeRef?: RefObject<any>;
}

export const WELCOME_ROUTE: IRoutesConfig = {
  path: "/welcome",
  element: <WelcomePage />,
  id: 11,
  nodeRef: createRef(),
};

export const protectedRoutes: IRoutesConfig[] = [
  {
    path: "/profile",
    element: <ProfilePage />,
    id: 12,
    nodeRef: createRef(),
  },
  {
    index: true,
    path: "/",
    element: <HomePage />,
    id: 0,
    nodeRef: createRef(),
  },
  {
    path: "/episodes",
    element: <EpisodePage />,
    id: 1,
    nodeRef: createRef(),
  },
  {
    path: "/characters",
    element: <CharacterPage />,
    id: 2,
    nodeRef: createRef(),
  },
  {
    path: "/characters/:id",
    element: <InfoAboutCharacterPage />,
    id: 3,
    nodeRef: createRef(),
  },
  {
    path: "/episodes/:id",
    element: <InfoAboutEpisodePage />,
    id: 4,
    nodeRef: createRef(),
  },
  {
    path: "/favorites",
    element: <FavoritePage />,
    id: 5,
    nodeRef: createRef(),
  },
  {
    path: "/create-character",
    element: (
      // todo: зробити окремий роут тільки для адмінів
      <CreateCharacterPage />
    ),
    id: 6,
    nodeRef: createRef(),
  },
];

export const publicRoutes: IRoutesConfig[] = [
  {
    path: "*",
    exact: false,
    element: <NotFoundPage />,
    id: 7,
    nodeRef: createRef(),
  },
  {
    path: "/logout",
    element: <LogoutPage />,
    id: 10,
    nodeRef: createRef(),
  },
  WELCOME_ROUTE,
  {
    path: "/signup",
    element: <SignupPage />,
    id: 8,
    nodeRef: createRef(),
  },
  {
    path: "/login",
    element: <LoginPage />,
    id: 9,
    nodeRef: createRef(),
  },
];
