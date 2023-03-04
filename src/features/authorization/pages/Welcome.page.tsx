import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useAppSelector } from '../../../application/store'
import { selectCurrentUser } from '../../users/services'
import { selectIsAuthenticated } from '../services'

export const WelcomePage: FC = () => {
  return <Typography variant='h3'>Welcome page</Typography>
}
