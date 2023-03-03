import React, { FC } from 'react'
import { map } from 'lodash'
import { Grid } from '@mui/material'
import { CharacterCard } from '../../components'
import { ICharacter } from '../../features/characters/type'
interface ICardListProps {
  items?: ICharacter[]
}
export const CardList: FC<ICardListProps> = ({ items }) => {
  return (
    <Grid container spacing={3} alignItems='flex-end'>
      {map(items, item => (
        <CharacterCard key={item.id} {...item} />
      ))}
    </Grid>
  )
}
