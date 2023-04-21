import React, { type FC } from 'react'
import { CircularProgress } from '@mui/material'

import { useGetManyEpisodesQuery } from 'features/episodes/services'

import { useQueryParams } from 'shared/hooks'
import { ErrorMessage } from 'shared/components'

export const MainEpisodePage: FC = () => {
  const queryPage = parseInt(useQueryParams().get('page') ?? '')
  const { data, isError, isLoading, error } = useGetManyEpisodesQuery(queryPage, {
    skip: !queryPage
  })

  return (
    <>
      {/* <Pagination
        prev={data?.info.prev}
        next={data?.info.next}
        navigationType={NavigationEnum.EPISODES}
        isLoading={isLoading}
      />*/}
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
