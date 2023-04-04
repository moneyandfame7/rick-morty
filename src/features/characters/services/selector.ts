import type { RootState } from 'application/store'

import type { Character } from 'features/characters/type'

export const selectFavoriteCharacters = (state: RootState): Character[] => state.favoriteCharacters.characters
export const selectFavoriteAmount = (state: RootState): number => state.favoriteCharacters.characters.length
