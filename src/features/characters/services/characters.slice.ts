import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { concat, filter, isEmpty } from 'lodash'

import type { Character } from 'features/characters/type'

interface CharacterState {
  characters: Character[]
}

const initialState: CharacterState = {
  characters: []
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<Character>) => {
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
