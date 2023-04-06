import React, { type FC } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

export const Footer: FC = () => {
  return (
    <Grid
      item
      xs={1}
      sx={{
        display: 'flex',
        alignItems: { md: 'start', lg: 'end' },
        flexDirection: { md: 'column', lg: 'row' },
        gap: 2,
        userSelect: 'none',
        justifyContent: 'space-between'
      }}
      width="100%"
    >
      <Stack direction="row" gap={1} alignItems="center">
        <CopyrightOutlinedIcon sx={{ color: 'primary.lighter', fontSize: 14 }} />
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: 'primary.lighter'
          }}
        >
          Rickmorty API
        </Typography>
      </Stack>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        component="a"
        href="mailto:rickandmorty@gmail.com"
        target="_blank"
        sx={{ textDecoration: 'none' }}
      >
        <EmailOutlinedIcon sx={{ color: 'primary.lighter', fontSize: 14 }} />
        <Typography sx={{ fontWeight: 400, fontSize: 14, color: 'primary.lighter' }}>
          rickandmortyapi@gmail.com
        </Typography>
      </Stack>
    </Grid>
  )
}
