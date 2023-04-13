import React, { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Container, Grid, Paper, Skeleton, Typography } from '@mui/material'

import { useGetManyCharactersQuery } from '@features/characters/services'
import { Filtration } from '@features/filters/components/Filtration'
import { useInitialFilters } from '@features/filters/hooks/useInitialFilters'
import { CharacterCard } from '@features/characters/components'

import { Pagination } from '@shared/components'
import { ErrorMessage } from '@shared/components'
import { SkeletonList } from '@shared/components'
import { Entities } from '@shared/constants'

export const MainCharacterPage: FC = () => {
  const [searchParams] = useSearchParams()
  const currentTake = Number(searchParams.get('take')) || 20
  const { data, isFetching, isError, error } = useGetManyCharactersQuery(searchParams.toString())
  const characterFilters = useInitialFilters(Entities.CHARACTER)

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}
    >
      <Box component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h5" fontWeight={600}>
          Characters
        </Typography>
        <Typography variant="h5" fontWeight={600} color="text.third">
          {data?.info?.count}
        </Typography>
      </Box>
      <Paper
        sx={{
          p: 2,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          position: 'relative',
          overflowX: 'hidden'
        }}
      >
        {!isFetching && data && !isError ? (
          <>
            <Pagination currentPage={data.info.page} pages={data.info.pages} />

            <Grid container spacing={2}>
              {data?.results.map(character => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
                  <CharacterCard character={character} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : isFetching ? (
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Skeleton width="40%" />
            <SkeletonList count={currentTake} />
          </Box>
        ) : (
          isError && error && <ErrorMessage error={error} />
        )}
      </Paper>
      <Filtration filters={characterFilters} />
    </Container>
  )
}
