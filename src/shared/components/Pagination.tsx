import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import { Button, Stack } from '@mui/material'

import { NavigationEnum } from 'shared/constants'
import { useQueryParams } from 'shared/hooks'

interface INavigationProps {
  prev: string | null | undefined
  next: string | null | undefined
  navigationType: NavigationEnum
  isLoading: boolean
}
export const Pagination: FC<INavigationProps> = ({ prev, next, navigationType, isLoading }) => {
  const queryPage = Number(useQueryParams().get('page'))
  const navigate = useNavigate()

  return (
    <Stack direction='row' gap={3} justifyContent='center'>
      <Button
        disabled={!prev || isLoading}
        onClick={() => {
          navigate(`/${navigationType}?page=${queryPage - 1}`)
        }}
        data-testid='navigation-button-prev-component'
        startIcon={<NavigateBeforeIcon />}
      >
        Previous
      </Button>
      <Button
        title='Next'
        disabled={!next || isLoading}
        onClick={() => {
          navigate(`/${navigationType}?page=${queryPage + 1}`)
        }}
        data-testid='navigation-button-next-component'
        endIcon={<NavigateNextIcon />}
      >
        Next
      </Button>
    </Stack>
  )
}
