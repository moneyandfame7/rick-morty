import { RootState } from "./store";
import { ICharacter } from "../interfaces";

export const getCharacters = (state: RootState): ICharacter[] => state.favoriteCharacters.characters;
export const getFavoritesAmount = (state: RootState): number => state.favoriteCharacters.characters.length;
