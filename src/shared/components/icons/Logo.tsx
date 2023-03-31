import { Stack, SxProps, Typography, TypographyProps, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { LogoIcon, LogoIconProps } from '../common/icons/LogoIcon'

interface LogoProps {
  logoIcon?: LogoIconProps
  textProps?: TypographyProps
  sx?: SxProps
}

export const Logo: FC<LogoProps> = ({ logoIcon, textProps, ...sx }) => {
  return (
    <Stack direction="row" gap={1} alignItems="center" {...sx}>
      <LogoIcon {...logoIcon} />
      <Typography variant="h6" fontWeight={600} color="text.primary" {...textProps}>
        Rickmorty
      </Typography>
    </Stack>
  )
}
