import { RootState } from "./store";
import { ICharacter } from "../interfaces";
import { User } from "../interfaces/auth";

export const getCharacters = (state: RootState): ICharacter[] => state.favoriteCharacters.characters;
export const getFavoritesAmount = (state: RootState): number => state.favoriteCharacters.characters.length;

export const getUser = (state: RootState): User | null => state.credentials.user;
export const isAuthenticated = (state: RootState): boolean => !!state.credentials.user;
export const hasPassedWelcome = (state: RootState): boolean => !!state.credentials.user?.username;
