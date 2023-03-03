import { RootState } from '../../../application/store'
import { ICharacter } from '../type'

export const selectFavoriteCharacters = (state: RootState): ICharacter[] => state.favoriteCharacters.characters
export const selectFavoriteAmount = (state: RootState): number => state.favoriteCharacters.characters.length
