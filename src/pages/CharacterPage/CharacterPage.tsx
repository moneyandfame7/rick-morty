import React from 'react'
import { useLocation } from 'react-router-dom'
import { CircularProgress, Container, Typography } from '@mui/material'
import { useQueryParams } from 'shared/hooks/useQueryParams'
import { useGetManyCharactersQuery } from 'features/characters/services/api.slice'

const CharacterPage: React.FC = () => {
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

export default CharacterPage
