import _ from 'lodash'

import type { RootState } from 'application/store'

import type { Character } from 'features/characters/type'

export const selectFavoriteCharacters = (state: RootState): Character[] => state.favoriteCharacters.characters

export const selectFavoriteAmount = (state: RootState): number => state.favoriteCharacters.characters.length

export const selectIsFavorite = (state: RootState, id?: number): boolean => {
  if (!id) {
    return false
  }
  const favIndex = _.findIndex(state.favoriteCharacters.characters, c => c.id === id)
  return favIndex !== -1
}
