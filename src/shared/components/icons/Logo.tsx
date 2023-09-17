import React, { type FC } from 'react'

import { Stack, type SxProps, Typography, type TypographyProps } from '@mui/material'

import { LogoIcon, type LogoIconProps } from './LogoIcon'

interface LogoProps {
  logoIcon?: LogoIconProps
  textProps?: TypographyProps
  sx?: SxProps
}

export const Logo: FC<LogoProps> = ({ logoIcon, textProps, ...sx }) => {
  return (
    <Stack direction="row" gap={1} alignItems="center" sx={{ userSelect: 'none', ...sx }}>
      <LogoIcon {...logoIcon} />
      <Typography variant="h6" fontWeight={600} color="text.primary" {...textProps}>
        Rickmorty
      </Typography>
    </Stack>
  )
}
