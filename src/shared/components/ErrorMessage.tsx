import React, { FC } from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { Container, Stack } from '@mui/material'
import Alert from '@mui/joy/Alert'
import { Box, Typography } from '@mui/joy'

interface IErrorMessage {
  error: FetchBaseQueryError | SerializedError | undefined
}

export const ErrorMessage: FC<IErrorMessage> = ({ error }) => {
  const handleError = () => {
    if (error) {
      console.log(error)
      if ('status' in error) {
        // you can access all properties of `FetchBaseQueryError` here
        switch (error.status) {
          case 404:
            return (
              <Stack direction='column' gap='10px'>
                <Typography component='h3' fontSize='3xl' fontWeight='bold'>
                  Page Not Found
                </Typography>
                <Typography component='h5' fontSize='sm'>
                  We could not find what you were looking for.
                </Typography>
              </Stack>
            )
          case 'FETCH_ERROR':
            return (
              <Stack direction='column' gap='10px'>
                <Typography component='h3' fontSize='3xl' fontWeight='bold'>
                  {error.status}
                </Typography>
                <Typography component='h5' fontSize='sm'>
                  {error.error}
                </Typography>
              </Stack>
            )
          default:
            return (
              <Stack direction='column' gap='10px'>
                <Typography component='h3' fontSize='3xl' fontWeight='bold'>
                  Oops! Something went wrong.
                </Typography>
              </Stack>
            )
        }
      } else {
        // you can access all properties of `SerializedError` here
        return (
          <Alert sx={{ alignItems: 'flex-start', width: '100%' }} variant='soft' color='danger'>
            <div>
              <Typography fontWeight='lg' mt={0.25}>
                Error!
              </Typography>
              <Typography fontSize='sm' sx={{ opacity: 0.8 }}>
                {error.message}
              </Typography>
            </div>
          </Alert>
        )
      }
    }
  }
  return <Box component='div'>{handleError()}</Box>
}
