import React, { FC, useEffect } from 'react'
import { Box, Button, Container, Grid, LinearProgress, Paper, Skeleton, Typography } from '@mui/material'
import { useGetManyCharactersQuery } from 'features/characters/services'
import { useQueryParams } from 'shared/hooks'
import { Backdrop } from 'shared/components/Backdrop'
import { CharacterCard } from '../components'
import { Pagination2 } from 'shared/components/Pagination2'
import { Filters } from 'shared/components/Filters'
import { useLocation, useSearchParams } from 'react-router-dom'
import { PutinHuiloModel } from 'shared/components/PutinHuiloModel'
import { useIsSomethingLoading } from '../../../application/store/selectors'
import { Pagination3 } from '../../../shared/components/Pagination3'
import { Filtration } from '../../../shared/components/Filtration'
import { SelectItems } from '../../../shared/components/SelectItems'
import Image from 'mui-image'
import { errorHandler } from '../../authorization/components/ErrorHandler'
import { ErrorMessage } from '../../../shared/components'

const genders = [
  { value: 'Male' },
  { value: 'Female' },
  { value: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
]
export const MainCharacterPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const loading = useIsSomethingLoading()

  const { data, isLoading, isFetching, isError, error } = useGetManyCharactersQuery(searchParams.toString())

  console.log(data, ' <<< characters <<<')
  const resetAllFilters = () => {}
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
