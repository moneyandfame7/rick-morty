import { useEffect, useState } from 'react'

import _ from 'lodash'

import { useAppSelector } from 'application/store'

import { selectFavoriteCharacters } from 'features/characters/services'
import type { Character } from 'features/characters/type'
import { useActions } from 'shared/hooks/useActions'

export const useToggleFavorite = (character?: Character) => {
  const favoriteCharacters = useAppSelector(selectFavoriteCharacters)
  const { addToFavorite, removeFromFavorite } = useActions()
  const [isFavorite, setIsFavorite] = useState(false)

  const toggle = () => {
    if (character) {
      if (isFavorite) {
        removeFromFavorite(character.id)
        setIsFavorite(false)
      } else {
        addToFavorite(character)
        setIsFavorite(true)
      }
    }
  }

  useEffect(() => {
    const favIndex = _.findIndex(favoriteCharacters, o => o.id === character?.id)
    favIndex === -1 ? setIsFavorite(false) : setIsFavorite(true)
  }, [character?.id, favoriteCharacters])
  return { toggle }
}
