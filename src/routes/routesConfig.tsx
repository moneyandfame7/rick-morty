import HomePage from "../pages/HomePage";
import LocationPage from "../pages/LocationPage";
import CharacterPage from "../pages/CharacterPage";
import EpisodePage from "../pages/EpisodePage";
import React, { createRef, RefObject } from "react";
import NotFoundPage from "../pages/NotFoundPage";
import InfoAboutCharacterPage from "../pages/InfoAboutCharacterPage";
import InfoAboutEpisodePage from "../pages/InfoAboutEpisodePage";
import FavoritePage from "../pages/FavoritePage";
import { Link } from "react-router-dom";

interface IRoutesConfig {
  path: string;
  element: React.ReactNode;
  id: number;
  exact?: boolean;
  nodeRef?: RefObject<any>;
  handle?: {
    crumb: () => React.ReactNode;
  };
}

export const routesConfig: IRoutesConfig[] = [
  {
    path: "/",
    element: <HomePage />,
    id: 0,
    nodeRef: createRef(),
    handle: {
      crumb: () => <Link to='/'>Home</Link>,
    },
  },
  {
    path: "/episode",
    element: <EpisodePage />,
    id: 1,
    nodeRef: createRef(),
    handle: {
      crumb: () => <Link to='/'>Episode</Link>,
    },
  },
  {
    path: "/location",
    element: <LocationPage />,
    id: 2,
    nodeRef: createRef(),
  },
  {
    path: "/character",
    element: <CharacterPage />,
    id: 3,
    nodeRef: createRef(),
  },
  {
    path: "/character/:id",
    element: <InfoAboutCharacterPage />,
    id: 4,
    nodeRef: createRef(),
  },
  {
    path: "/episode/:id",
    element: <InfoAboutEpisodePage />,
    id: 5,
    nodeRef: createRef(),
  },
  {
    path: "/favorite",
    element: <FavoritePage />,
    id: 6,
    nodeRef: createRef(),
  },
  {
    path: "*",
    exact: false,
    element: <NotFoundPage />,
    id: 7,
    nodeRef: createRef(),
  },
];
