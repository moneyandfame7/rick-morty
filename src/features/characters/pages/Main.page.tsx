import React, { FC } from 'react'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import { useGetManyCharactersQuery } from 'features/characters/services'
import { CharacterCard } from '../components'
import { useSearchParams } from 'react-router-dom'
import { Pagination3 } from '../../../shared/components/Pagination3'
import { Filtration } from '../../../shared/components/Filtration'
import { ErrorMessage } from '../../../shared/components'

export const MainCharacterPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  // TODO: fix paper when data is fetch
  // todo: skeleton with array of count ( ?take=number )
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

          <Paper
            sx={{
              p: data ? 2 : 0,
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
                <Pagination3 currentPage={data?.info.page} pages={data?.info.pages} />
                <Grid container spacing={2}>
                  {data?.results.map(character => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
                      <CharacterCard character={character} />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : isFetching && !data ? null : isError && error ? (
              <ErrorMessage error={error} />
            ) : null}
          </Paper>
          <Filtration />
        </Container>
      </Box>
    </>
  )
}
