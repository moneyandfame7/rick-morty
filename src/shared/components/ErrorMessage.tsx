import React, { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

import Image from 'mui-image'
import { Box, Button, Typography } from '@mui/material'

interface ErrorMessageProps {
  error: FetchBaseQueryError | SerializedError
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const resetFilters = () => {
    const oldQuery = Object.fromEntries(new URLSearchParams(searchParams))
    Object.keys(oldQuery).forEach(key => {
      searchParams.delete(key)
    })
    searchParams.set('page', '1')
    searchParams.set('take', '20')
    const newQuery = Object.fromEntries(new URLSearchParams(searchParams))
    setSearchParams(newQuery)
  }
  const handleError = () => {
    if ('status' in error) {
      switch (error.status) {
        case 404:
          return (
            <Box
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                userSelect: 'none'
              }}
            >
              <Image
                src={`https://rick-morty.s3.eu-central-1.amazonaws.com/assets/${error.status}.png`}
                alt="Error Image"
                width={500}
                duration={500}
                showLoading={true}
                style={{
                  borderRadius: 8,
                  pointerEvents: 'none'
                }}
              />
              <div>
                <Typography variant="h6">{error.status}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                  {(error.data as any).message}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  /* onClick={() => {
                 resetAllFilters()
               }}*/
                  onClick={resetFilters}
                >
                  Reset all filters
                </Button>
              </div>
            </Box>
          )
        case 422:
          return (
            <Box
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                userSelect: 'none'
              }}
            >
              <Image
                src={`https://rick-morty.s3.eu-central-1.amazonaws.com/assets/${error.status}.png`}
                alt="Error Image"
                width={500}
                duration={500}
                showLoading={true}
                style={{
                  borderRadius: 8,
                  pointerEvents: 'none'
                }}
              />
              <div>
                <Typography variant="h6">{error.status}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                  The filter data is incorrect. Try resetting the filters.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  /* onClick={() => {
                 resetAllFilters()
               }}*/
                  onClick={resetFilters}
                >
                  Reset all filters
                </Button>
              </div>
            </Box>
          )
        default:
          return <Typography variant="h3">Oops... something went wrong</Typography>
      }
    } else {
      // you can access all properties of `SerializedError` here
      return (
        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            userSelect: 'none'
          }}
        >
          <Image
            src={`https://rick-morty.s3.eu-central-1.amazonaws.com/assets/${error.code}.png`}
            alt="Error Image"
            width={500}
            duration={500}
            showLoading={true}
            style={{
              borderRadius: 8,
              pointerEvents: 'none'
            }}
          />
          <div>
            <Typography variant="h6">{error.code}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
              {error.message}
            </Typography>
            <Button
              variant="contained"
              size="small"
              /* onClick={() => {
                 resetAllFilters()
               }}*/
            >
              Reset all filters
            </Button>
          </div>
        </Box>
      )
    }
  }

  return handleError()
}
