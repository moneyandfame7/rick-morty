import { FC } from 'react'
import { CircularProgress, Typography } from '@mui/material'
import { useGetUserQuery } from '../../features/authorization/services/api.slice'
import { useQueryParams } from '../../shared/hooks/useQueryParams'

export const ProfilePage: FC = () => {
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
