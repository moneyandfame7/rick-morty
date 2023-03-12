import { FC, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography
} from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import MailIcon from '@mui/icons-material/Mail'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'
import { ColorModeToggle } from './ColorModeToggle'
import { FontFamilyPicker } from './FontFamilyPicker'
import { ColorPalette } from './ColorPalette'
import { useAppDispatch } from 'application/store'
import { resetAllSetings } from 'application/theme/customization'
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
      <Tooltip title='Open settings drawer'>
        <IconButton
          sx={{ border: '1px solid', borderColor: 'primary.border', borderRadius: '4px' }}
          onClick={openDrawer}
        >
          <SettingsOutlinedIcon sx={{ fontSize: '1.25rem', color: 'primary.lighter' }} />
        </IconButton>
      </Tooltip>

      <Drawer
        anchor='right'
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
        <Box component='div'>
          <Box component='div' padding='20px 10px' display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='h1' fontSize={18} fontWeight={500}>
              Settings
            </Typography>
            <IconButton sx={{ p: 0.5 }} onClick={closeDrawer}>
              <CloseOutlinedIcon sx={{ fontSize: 25, color: 'primary.lighter' }} />
            </IconButton>
          </Box>
          <Divider />
        </Box>
        <Box component='div' padding='40px 16px'>
          <Chip
            sx={{ float: 'right' }}
            size='small'
            color='primary'
            label='Reset settings'
            onClick={handleResetSettings}
            onDelete={handleResetSettings}
            deleteIcon={<ManageHistoryIcon />}
          />
          <Stack direction='column' sx={{ gap: { xs: 8, sm: 5 } }} mt={5}>
            <Box component='div'>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 600, textTransform: 'uppercase', opacity: 0.5, fontSize: 12, mb: 1 }}
              >
                Mode
              </Typography>
              <ColorModeToggle />
            </Box>
            <Box component='div'>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 600, textTransform: 'uppercase', opacity: 0.5, fontSize: 12, mb: 1 }}
              >
                Font family
              </Typography>
              <FontFamilyPicker />
            </Box>
            <Box component='div'>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 600, textTransform: 'uppercase', opacity: 0.5, fontSize: 12, mb: 1 }}
              >
                Color palette
              </Typography>
              <ColorPalette />
            </Box>
            <Box component='div'>
              <Box component='div' display='flex' justifyContent='space-between' alignItems='center' mt={2}>
                <Typography
                  variant='subtitle2'
                  sx={{ fontWeight: 600, textTransform: 'uppercase', opacity: 0.5, fontSize: 10 }}
                >
                  Preview:
                </Typography>
                <Stack direction='row' gap={1} alignItems='center'>
                  <Badge badgeContent={4} color='primary'>
                    <MailIcon color='action' />
                  </Badge>
                  <Switch defaultChecked />
                  <Button variant='contained' size='small' sx={{ textTransform: 'initial', p: 0 }}>
                    Click
                  </Button>
                </Stack>
              </Box>
              <Typography variant='body2' sx={{ opacity: 0.8, fontWeight: 500 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ipsum sequi, corrupti dolore beatae
                repudiandae?
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </>
  )
}
