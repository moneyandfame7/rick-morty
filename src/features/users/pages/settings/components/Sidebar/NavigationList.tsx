import React, { type FC } from 'react'

import { Box, Typography } from '@mui/material'

import { NavigationLink } from './NavigationLink'
import { type NavigationLinkType } from './utils'

interface NavigationListProps {
  links: NavigationLinkType[]
  header?: string
}
export const NavigationList: FC<NavigationListProps> = ({ links, header }) => {
  return (
    <Box>
      {header && (
        <Typography px="15px" fontSize={12} fontWeight={600} color="text.secondary">
          {header}
        </Typography>
      )}
      {links.map(link => (
        <NavigationLink key={link.label} {...link} />
      ))}
    </Box>
  )
}
