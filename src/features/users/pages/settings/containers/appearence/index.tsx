import React, { type FC } from 'react'

import { Typography } from '@mui/material'

import { Subheader } from 'features/users/pages/settings/components'
import { ThemeModeToggle } from 'features/users/pages/settings/containers/appearence/components/ThemeModeToggle'

export const AppearenceContainer: FC = () => {
  return (
    <>
      <Subheader title="Theme preferences" />
      <Typography fontWeight={500} fontSize={14} sx={{ maxWidth: { xs: '100%', lg: '80%' } }}>
        Choose how RickmortyApi looks to you. Select a single theme, or sync with your system and automatically switch
        between day and night themes.
      </Typography>

      <ThemeModeToggle />
    </>
  )
}
