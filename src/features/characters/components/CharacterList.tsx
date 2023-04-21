import React, { type FC } from 'react'

import { Grid } from '@mui/material'

import type { Character } from 'features/characters/type'
import { CharacterCard } from './CharacterCard'

interface CharacterListProps {
  characters: Character[]
}
export const CharacterList: FC<CharacterListProps> = ({ characters }) => {
  return (
    <Grid container spacing={2}>
      {characters.map(character => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
          <CharacterCard character={character} />
        </Grid>
      ))}
    </Grid>
  )
}
