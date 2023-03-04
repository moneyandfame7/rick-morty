import React, { FC } from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { Container, Stack, Typography } from '@mui/material'

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
                <Typography component='h3' variant='h3' fontWeight='bold'>
                  Page Not Found
                </Typography>
                <Typography component='h5' variant='subtitle2'>
                  We could not find what you were looking for.
                </Typography>
              </Stack>
            )
          case 'FETCH_ERROR':
            return (
              <Stack direction='column' gap='10px'>
                <Typography component='h3' variant='h3' fontWeight='bold'>
                  {error.status}
                </Typography>
                <Typography component='h5' variant='subtitle2'>
                  {error.error}
                </Typography>
              </Stack>
            )
          default:
            return (
              <Stack direction='column' gap='10px'>
                <Typography component='h3' variant='h3' fontWeight='bold'>
                  Oops! Something went wrong.
                </Typography>
              </Stack>
            )
        }
      } else {
        // you can access all properties of `SerializedError` here
        return (
          <Typography variant='h3' component='h3'>
            {error.message}
          </Typography>
        )
      }
    }
  }
  return (
    <Container
      maxWidth='md'
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {handleError()}
    </Container>
  )
}
