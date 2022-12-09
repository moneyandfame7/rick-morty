import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FAVORITE_CHARACTERS, getLocalStorage } from "../../utils/localStorage";
import { ICharacter } from "../../interfaces";
import { concat, filter } from "lodash";
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
      state.characters = concat(state.characters, action.payload);
    },
    removeFromFavorite: (state, action: PayloadAction<number>) => {
      if (state.characters) {
        state.characters = filter(state.characters, c => c.id !== action.payload);
      }
    },
  },
});

export const { addToFavorite, removeFromFavorite } = charactersSlice.actions;

export default charactersSlice.reducer;
