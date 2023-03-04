import { FC } from 'react'
import { CircularProgress, Typography } from '@mui/material'

import { useGetUserQuery } from 'features/authorization/services'

import { useQueryParams } from 'shared/hooks'

export const UserProfilePage: FC = () => {
  const { data, isLoading, error } = useGetUserQuery()
  const queryPage = Number(useQueryParams().get('page'))
  return (
    <>
      {isLoading && <CircularProgress />}
      {data && (
        <Typography>
          {data.email}: {data.id}
        </Typography>
      )}
    </>
  )
}
