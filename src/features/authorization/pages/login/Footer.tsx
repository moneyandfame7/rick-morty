import React, { FC } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined'

export const Footer: FC = () => {
  return (
    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'end' }} width="100%">
      <Stack direction="row" gap={1} alignItems="center" width="100%">
        <CopyrightOutlinedIcon sx={{ color: 'primary.dark', fontSize: 14 }} />
        <Typography sx={{ fontWeight: 400, fontSize: 14, color: 'primary.dark' }}>Rickmorty API</Typography>
      </Stack>
    </Grid>
  )
}
