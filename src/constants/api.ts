const API_URL = "https://rickandmortyapi.com/api/";
const PAGE_PARAM = "?page=";

export enum NavigationTypeEnum {
  CHARACTER = "character",
  LOCATION = "location",
  EPISODE = "episode",
}

export const API_CHARACTER_ALL = API_URL + NavigationTypeEnum.CHARACTER + PAGE_PARAM;

export const API_CHARACTER_ONLY_ONE = API_URL + NavigationTypeEnum.CHARACTER;

export const API_LOCATION = API_URL + NavigationTypeEnum.LOCATION;

export const API_EPISODE_ALL = API_URL + NavigationTypeEnum.EPISODE + PAGE_PARAM;
