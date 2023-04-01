import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { LINKS_CONFIG } from 'shared/layout/Header/utils/links'
import { Logo } from '../../../components/icons/Logo'

interface HeaderDrawerProps {
  window?: () => Window
  isOpen: boolean
  onClose: () => void
}

export const HeaderDrawer: FC<HeaderDrawerProps> = ({ window, isOpen, onClose }) => {
  const container = window !== undefined ? () => window().document.body : undefined
  const navigate = useNavigate()
  return (
    <Box component="nav" sx={{ transition: '0.2s' }}>
      <Drawer
        container={container}
        variant="temporary"
        open={isOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
          sx: {
            zIndex: 1201
          }
        }}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 300 }
          }
        }}
      >
        <Box component="div" sx={{ textAlign: 'center', height: '70px' }}>
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: '16px 12px'
            }}
          >
            <Logo />

            <IconButton sx={{ p: 0.5 }} onClick={onClose}>
              <CloseOutlinedIcon sx={{ fontSize: 25, color: 'text.secondary' }} />
            </IconButton>
          </Box>
          <Divider />
          <List component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {LINKS_CONFIG.map(link => (
              <ListItemButton
                key={link.id}
                onClick={() => {
                  onClose()
                  navigate({ pathname: link.url, search: link.search })
                }}
                sx={{ p: 0 }}
              >
                <Typography
                  fontWeight={600}
                  color="text.secondary"
                  sx={{ p: '12px 16px', fontSize: '16px', lineHeight: '24px' }}
                >
                  {link.name}
                </Typography>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}
