import { Typography } from '@mui/material'
import { useAppSelector } from 'application/store'
import { selectCurrentUser } from 'features/users/services'
import { FC } from 'react'

export const WelcomePage: FC = () => {
  const user = useAppSelector(selectCurrentUser)
  return (
    <>
      <Typography variant='h3'>Welcome page</Typography>
    </>
  )
}
