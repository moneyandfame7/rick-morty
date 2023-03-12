import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, CardContent, CardMedia, CircularProgress, Container, LinearProgress, Typography } from '@mui/material'

import { useGetManyCharactersQuery } from 'features/characters/services'

import { useQueryParams } from 'shared/hooks'
import { Layout } from 'antd'
import { getRandomFromInterval } from 'shared/utils/randomNumber'

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
  const video = `https://rick-morty.s3.eu-central-1.amazonaws.com/characters/1.jpeg`
  return (
    <React.Fragment>
      {isLoading && (
        <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, borderRadius: '8px 8px 0 0', width: '100%' }} />
      )}
      <Container maxWidth='xs'>
        {data?.results.map(character => (
          <Card variant='outlined' key={character.id}>
            <CardMedia sx={{ zIndex: -5, height: 300 }} component='img' image={character.image} />
            <CardContent>
              <Typography variant='h5' fontWeight={500}>
                {character.id} {character.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </React.Fragment>
  )
}
