 import { ICharacter } from "../interfaces";

export const FAVORITE_CHARACTERS = "FAVORITE_CHARACTERS";

export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

export const setLocalStorage = (key: string, data: ICharacter[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};
