import HomePage from "../pages/HomePage";
import LocationPage from "../pages/LocationPage";
import CharacterPage from "../pages/CharacterPage";
import EpisodePage from "../pages/EpisodePage";
import React from "react";
import NotFoundPage from "../pages/NotFoundPage";
import InfoAboutCharacterPage from "../pages/InfoAboutCharacterPage";
import InfoAboutEpisodePage from '../pages/InfoAboutEpisodePage'
interface IRoutesConfig {
  path: string;
  element: React.ReactNode;
  id: number;
  exact?: boolean;
}

export const routesConfig: IRoutesConfig[] = [
  {
    path: "/",
    element: <HomePage />,
    id: 0,
  },
  {
    path: "/episode",
    element: <EpisodePage />,
    id: 1,
  },
  {
    path: "/location",
    element: <LocationPage />,
    id: 2,
  },
  {
    path: "/character",
    element: <CharacterPage />,
    id: 3,
  },
  {
    path: "/character/:id",
    element: <InfoAboutCharacterPage />,
    id: 4,
  },
  {
    path:"/episode/:id",
    element:<InfoAboutEpisodePage/>,
    id:5,
  },
  {
    path: "*",
    exact: false,
    element: <NotFoundPage />,
    id: 6,
  },
];
