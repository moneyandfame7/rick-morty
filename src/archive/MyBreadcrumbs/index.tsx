import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import { Breadcrumbs, Chip, emphasize, styled, useTheme } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useMakeArchitectureBreadcrumbs } from '../useMakeArchitectureBreadcrumbs/useMakeArchitectureBreadcrumbs'

export const MyBreadcrumbs: FC = () => {
  const theme = useTheme()
  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800]
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06)
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12)
      }
    }
  }) as typeof Chip
  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{ px: 3 }}>
      {useMakeArchitectureBreadcrumbs()?.map(link => (
        <NavLink key={link.id} to={link.path}>
          <StyledBreadcrumb
            component="span"
            label={link.label}
            icon={link.label === 'Home' ? <HomeIcon fontSize="small" /> : undefined}
            sx={link.isActive ? { color: theme.palette.primary.main } : undefined}
          />
        </NavLink>
      ))}
    </Breadcrumbs>
  )
}
