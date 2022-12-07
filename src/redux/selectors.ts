import { RootState } from "./store";
import { ICharacter } from "../interfaces";
import { AnyAction } from "@reduxjs/toolkit";

export const getCharacters = (state: RootState): ICharacter[] => state.characters.characters;
export const getFavoritesAmount = (state: RootState): number => state.characters.characters.length;

export const isLoading = (action: AnyAction) => action.type.endsWith("pending");
export const isError = (action: AnyAction) => action.type.endsWith("rejected");
