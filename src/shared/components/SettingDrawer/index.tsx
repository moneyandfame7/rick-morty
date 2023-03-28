import { FC, useState } from 'react'
import { Box, Chip, Divider, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'

import { useAppDispatch } from 'application/store'
import { resetAllSetings } from 'application/theme/customization'
import { ColorModeToggle } from './ColorModeToggle'

export const SettingDrawer: FC = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const openDrawer = () => {
    setOpen(true)
  }
  const closeDrawer = () => {
    setOpen(false)
  }
  const handleResetSettings = () => {
    dispatch(resetAllSetings())
  }
  return (
    <>
      <Tooltip title="Open settings drawer">
        <IconButton
          sx={{ border: '1px solid', borderColor: 'primary.border', borderRadius: '4px' }}
          onClick={openDrawer}
        >
          <SettingsOutlinedIcon sx={{ fontSize: '1.25rem', color: 'primary.lighter' }} />
        </IconButton>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 450 },
            borderTopLeftRadius: { xs: 0, sm: 15 },
            borderBottomLeftRadius: { xs: 0, sm: 15 }
          }
        }}
      >
        <Box component="div">
          <Box component="div" padding="20px 10px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h1" fontSize={18} fontWeight={500}>
              Settings
            </Typography>
            <IconButton sx={{ p: 0.5 }} onClick={closeDrawer}>
              <CloseOutlinedIcon sx={{ fontSize: 25, color: 'primary.lighter' }} />
            </IconButton>
          </Box>
          <Divider />
        </Box>
        <Box component="div" padding="40px 16px">
          <Stack direction="column" sx={{ gap: { xs: 8, sm: 5 } }}>
            <Box component="div">
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, textTransform: 'uppercase', opacity: 0.5, fontSize: 12, mb: 1 }}
              >
                Mode
              </Typography>
              <ColorModeToggle />
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </>
  )
}
