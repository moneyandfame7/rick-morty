import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

import { LOGIN_ROUTE } from '@features/authorization/routes'
import { useActions } from '@shared/hooks/useActions'
import { useAppSelector } from '@application/store'
import { selectIsAuthenticated } from '../services'

interface GoBackButtonProps {
  isLoading?: boolean
}

export const GoBackButton: FC<GoBackButtonProps> = ({ isLoading = false }) => {
  const navigate = useNavigate()
  const { removeUser } = useActions()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const onClickBack = () => {
    if (isAuthenticated) {
      removeUser()
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
