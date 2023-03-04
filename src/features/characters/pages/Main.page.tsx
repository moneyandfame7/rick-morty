import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { CircularProgress, Container, Typography } from '@mui/material'

import { useGetManyCharactersQuery } from 'features/characters/services'

import { useQueryParams } from 'shared/hooks'

export const MainCharacterPage: FC = () => {
  const location = useLocation()
  const queryPage = Number(useQueryParams().get('page'))
  const { data, isLoading, isError, error } = useGetManyCharactersQuery(queryPage)
  console.log(location, queryPage)

  // if (isError) {
  //   return <ErrorMessage error={error} />;
  // }

  // <>
  //   <Navigation
  //     isLoading={isLoading}
  //     prev={data?.info.prev}
  //     next={data?.info.next}
  //     navigationType={NavigationTypeEnum.CHARACTER}
  //   />
  //   <CardList items={data?.results} />
  // </>
  return (
    <>
      {isLoading && <CircularProgress sx={{ marginTop: '30px' }} />}
      <Container maxWidth='xs'>
        {data?.results.map(char => (
          <Typography key={char.id}>{char.name}</Typography>
        ))}
      </Container>
    </>
  )
}
