import React, { FC, useEffect } from 'react'
import { Box, Container, Grid, LinearProgress, Paper, Skeleton, Typography } from '@mui/material'
import { useGetManyCharactersQuery } from 'features/characters/services'
import { useQueryParams } from 'shared/hooks'
import { Backdrop } from 'shared/components/Backdrop'
import { CharacterCard } from '../components'
import { Pagination2 } from 'shared/components/Pagination2'
import { Filters } from 'shared/components/Filters'
import { useLocation, useSearchParams } from 'react-router-dom'

export const MainCharacterPage: FC = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  console.log(searchParams.toString())
  const queryPage = Number(useQueryParams().get('page'))

  const { data, isLoading, isFetching, isError, error } = useGetManyCharactersQuery(searchParams.toString())

  return (
    <>
      <Box component='div'>
        <Container
          maxWidth='lg'
          sx={{
            mt: 5,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <Box component='div' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='h5' fontWeight={600}>
              Characters
            </Typography>
            <Typography variant='h5' fontWeight={600} color='text.third'>
              {data?.info?.count}
            </Typography>
          </Box>

          <Filters info={data?.info} />
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
            <Pagination2 info={data?.info} isFetching={isFetching} />
            <Grid container spacing={2}>
              {isFetching ? (
                <>
                  <LinearProgress sx={{ position: 'absolute', width: '100%', top: 0 }} />
                  <LinearProgress sx={{ position: 'absolute', width: '100%', bottom: 0 }} />
                </>
              ) : (
                data?.results.map(character => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
                    <CharacterCard character={character} />
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  )
}
