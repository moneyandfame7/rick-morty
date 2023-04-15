import React, { type FC } from 'react'

import { Box, Skeleton } from '@mui/material'

import { useCharacters } from 'features/characters/hooks'
import { CharacterList, SkeletonCharacterList } from 'features/characters/components'
import { Filtration } from 'features/filters/components'

import { ErrorMessage, Pagination } from 'shared/components'

export const Main: FC = () => {
  const { filters, isFetching, error, currentTake, data } = useCharacters()

  return (
    <>
      {!isFetching && data && !error ? (
        <>
          <Pagination currentPage={data.info.page} pages={data.info.pages} />

          <CharacterList characters={data.results} />
        </>
      ) : isFetching ? (
        <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Skeleton width="40%" />
          <SkeletonCharacterList count={currentTake} />
        </Box>
      ) : (
        error && <ErrorMessage error={error} />
      )}
      <Filtration filters={filters} />
    </>
  )
}
