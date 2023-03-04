import type { RootState } from 'application/store'

import type { ICharacter } from 'features/characters/type'

export const selectFavoriteCharacters = (state: RootState): ICharacter[] => state.favoriteCharacters.characters
export const selectFavoriteAmount = (state: RootState): number => state.favoriteCharacters.characters.length
