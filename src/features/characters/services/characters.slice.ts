import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { concat, filter, isEmpty } from 'lodash'

import type { ICharacter } from 'features/characters/type'

interface CharacterState {
  characters: ICharacter[]
}

const initialState: CharacterState = {
  characters: /*getLocalStorage<ICharacter[]>(LocalStorageKey.FAVORITE_CHARACTERS) ||*/ []
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<ICharacter>) => {
      state.characters = filter(concat(state.characters, action.payload), o => !isEmpty(o))
    },
    removeFromFavorite: (state, action: PayloadAction<number>) => {
      if (state.characters) {
        state.characters = filter(state.characters, c => c.id !== action.payload)
      }
    }
  }
})

export const { addToFavorite, removeFromFavorite } = charactersSlice.actions

export const charactersReducer = charactersSlice.reducer
