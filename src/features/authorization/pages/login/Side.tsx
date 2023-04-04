import React, { FC } from 'react'
import { Grid, useTheme } from '@mui/material'
import Image from 'mui-image'

export const Side: FC = () => {
  const mode = useTheme().palette.mode

  return (
    <Grid
      item
      md={7}
      sx={{
        display: { xs: 'none', md: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
        backgroundColor: 'primary.dark'
      }}
    >
      <Image
        src={`https://rick-morty.s3.eu-central-1.amazonaws.com/assets/login-${mode}.jpeg`}
        alt="Login image"
        duration={1000}
        showLoading={true}
        style={{
          pointerEvents: 'none'
        }}
      />
    </Grid>
  )
}
