import { Grid } from '@mui/material'
import { useAppSelector } from 'application/store'
import { CharacterCard } from 'features/characters/components'
import { selectFavoriteCharacters } from 'features/characters/services'
import React, { type FC } from 'react'

export const FavoritePage: FC = () => {
  const favorites = useAppSelector(selectFavoriteCharacters)
  return (
    <Grid container spacing={2}>
      {favorites.map(character => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
          <CharacterCard character={character} />
        </Grid>
      ))}
    </Grid>
  )
}
