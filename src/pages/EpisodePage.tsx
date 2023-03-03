import React, { FC } from 'react'
import { CircularProgress } from '@mui/material'
import { useQueryParams } from '../shared/hooks/useQueryParams'
import { ErrorMessage, Navigation } from '../components'
import { useGetManyEpisodesQuery } from '../features/episodes/services/api.slice'
import { NavigationEnum } from '../shared/constants/api'

const EpisodePage: FC = () => {
  const queryPage = parseInt(useQueryParams().get('page') ?? '')
  const { data, isError, isLoading, error } = useGetManyEpisodesQuery(queryPage, {
    skip: !queryPage
  })

  return (
    <>
      <Navigation
        prev={data?.info.prev}
        next={data?.info.next}
        navigationType={NavigationEnum.EPISODES}
        isLoading={isLoading}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 15,
          flexWrap: 'wrap',
          marginTop: '20px',
          justifyContent: 'center'
        }}
      >
        {isError && <ErrorMessage error={error} />}
        {isLoading && !isError ? (
          <CircularProgress sx={{ marginTop: '30px' }} />
        ) : (
          data?.results?.map(episode => (
            <h5 style={{ width: '49%', textAlign: 'center' }} key={episode.id}>
              <span style={{ opacity: 0.9 }}>Name: </span>
              <span style={{ opacity: 0.6 }}>{episode.name}</span>
            </h5>
          ))
        )}
      </div>
    </>
  )
}

export default EpisodePage
