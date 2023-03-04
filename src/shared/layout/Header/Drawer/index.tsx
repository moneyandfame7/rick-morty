import React, { FC } from 'react'
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import useTheme from '@mui/material/styles/useTheme'
import { LINKS_CONFIG } from 'shared/layout/Header/utils/links'

interface HeaderDrawerProps {
  window?: () => Window
  isOpen: boolean
  onClose: () => void
}

export const HeaderDrawer: FC<HeaderDrawerProps> = ({ window, isOpen, onClose }) => {
  const container = window !== undefined ? () => window().document.body : undefined
  const theme = useTheme()

  return (
    <Box component='nav'>
      <Drawer
        container={container}
        variant='temporary'
        open={isOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
        }}
      >
        <Box onClick={onClose} sx={{ textAlign: 'center', height: '70px' }}>
          <Typography variant='h6' sx={{ my: 2 }}>
            RICK & MORTY
          </Typography>
          <Divider />
          <List>
            {LINKS_CONFIG.map(
              ({ url, name, id }) =>
                name !== 'Favorites' && (
                  <ListItem key={id} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                      <NavLink
                        to={url}
                        key={id}
                        style={({ isActive }) => (isActive ? { color: theme.palette.primary.dark } : undefined)}
                      >
                        <ListItemText primary={name} />
                      </NavLink>
                    </ListItemButton>
                  </ListItem>
                )
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}
