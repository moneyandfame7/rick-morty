import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

import { useAppDispatch, useAppSelector } from 'application/store'
import { LOGIN_ROUTE } from 'features/authorization/routes'
import { selectIsAuthenticated } from 'features/authorization/services'
import { removeUser } from 'features/users/services'

interface GoBackButtonProps {
  isLoading?: boolean
}

export const GoBackButton: FC<GoBackButtonProps> = ({ isLoading = false }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const onClickBack = () => {
    if (isAuthenticated) {
      dispatch(removeUser())
    }
    navigate({ pathname: LOGIN_ROUTE.path })
  }
  return (
    <Button
      variant="text"
      sx={{ color: 'text.secondary', fontWeight: 500 }}
      startIcon={<ArrowBackOutlinedIcon />}
      onClick={onClickBack}
      disabled={isLoading}
    >
      Back to log in
    </Button>
  )
}
