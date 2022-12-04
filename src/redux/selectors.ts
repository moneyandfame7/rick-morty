import { RootState } from "./store";
import { ICharacter } from "../interfaces";

export const getCharacters = (state: RootState): ICharacter[] => state.characters.characters;
export const getFavoritesAmount = (state: RootState): number => state.characters.characters.length;
