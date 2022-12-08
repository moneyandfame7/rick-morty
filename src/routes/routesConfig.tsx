import HomePage from "../pages/HomePage";
import CharacterPage from "../pages/CharacterPage";
import EpisodePage from "../pages/EpisodePage";
import React, { createRef, RefObject } from "react";
import NotFoundPage from "../pages/NotFoundPage";
import InfoAboutCharacterPage from "../pages/InfoAboutCharacterPage";
import InfoAboutEpisodePage from "../pages/InfoAboutEpisodePage";
import FavoritePage from "../pages/FavoritePage";

interface IRoutesConfig {
  path: string;
  element: React.ReactNode;
  id: number;
  exact?: boolean;
  nodeRef?: RefObject<any>;
}

export const routesConfig: IRoutesConfig[] = [
  {
    path: "/",
    element: <HomePage />,
    id: 0,
    nodeRef: createRef(),
  },
  {
    path: "/episode",
    element: <EpisodePage />,
    id: 1,
    nodeRef: createRef(),
  },

  {
    path: "/character",
    element: <CharacterPage />,
    id: 2,
    nodeRef: createRef(),
  },
  {
    path: "/character/:id",
    element: <InfoAboutCharacterPage />,
    id: 3,
    nodeRef: createRef(),
  },
  {
    path: "/episode/:id",
    element: <InfoAboutEpisodePage />,
    id: 4,
    nodeRef: createRef(),
  },
  {
    path: "/favorite",
    element: <FavoritePage />,
    id: 5,
    nodeRef: createRef(),
  },
  {
    path: "*",
    exact: false,
    element: <NotFoundPage />,
    id: 6,
    nodeRef: createRef(),
  },
];
