import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'

const NotFoundPage: FC = () => {
  const location = useLocation()
  return (
    <Stack direction='column' gap='10px' alignItems='center'>
      <Typography component='h3' variant='h3' fontWeight='bold'>
        404
      </Typography>
      <Typography component='h4' variant='h4'>
        Not found page
      </Typography>

      <Stack direction='row' gap='20px' alignItems='center'>
        No match for
        <Button variant='outlined' data-testid='button-link' disabled>
          {location.pathname}
        </Button>
      </Stack>
    </Stack>
  )
}

export default NotFoundPage
