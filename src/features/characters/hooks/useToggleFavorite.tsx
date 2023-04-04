import { useEffect, useState } from 'react'

import _ from 'lodash'

import { useAppDispatch, useAppSelector } from 'application/store'

import { addToFavorite, removeFromFavorite, selectFavoriteCharacters } from 'features/characters/services'
import type { Character } from 'features/characters/type'

export const useToggleFavorite = (character?: Character) => {
  const favoriteCharacters = useAppSelector(selectFavoriteCharacters)
  const dispatch = useAppDispatch()
  const [isFavorite, setIsFavorite] = useState(false)
  const toggle = () => {
    console.log('Click')
    if (character) {
      if (isFavorite) {
        dispatch(removeFromFavorite(character.id))
        setIsFavorite(false)
      } else {
        dispatch(addToFavorite(character))
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
