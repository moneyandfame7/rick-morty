import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FAVORITE_CHARACTERS, getLocalStorage } from "../utils/localStorage";
import { ICharacter } from "../interfaces";

interface CharacterState {
  characters: ICharacter[];
}

const initialState: CharacterState = {
  characters: getLocalStorage(FAVORITE_CHARACTERS),
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<ICharacter>) => {
      state.characters.push(action.payload);
    },
    removeFromFavorite: (state, action: PayloadAction<number>) => {
      if (state.characters) {
        state.characters = state.characters.filter(c => c.id !== action.payload);
      }
    },
  },
});

export const { addToFavorite, removeFromFavorite } = charactersSlice.actions;

export default charactersSlice.reducer;
