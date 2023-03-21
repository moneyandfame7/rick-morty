import { FC } from 'react'
import { Box, Button } from '@mui/material'
import { GitHub } from '@mui/icons-material'
import { GoogleIcon } from './GoogleIcon'
import { SpotifyIcon } from './SpotifyIcon'
import { DiscordIcon } from './DiscordIcon'
import { Link, useNavigate } from 'react-router-dom'

export const SocialLogin: FC = () => {
  const redirectToGoogle = async () => {
    const googleLoginUrl = 'http://localhost:3001/auth/google/login'
    window.open(googleLoginUrl, '_self', 'width=500,height=600')
  }
  return (
    <Box component='div'>
      <Button
        variant='contained'
        sx={{ fontWeight: 600 }}
        startIcon={<GoogleIcon />}
        fullWidth
        onClick={redirectToGoogle}
      >
        Login in with Google
      </Button>
      <Button variant='contained' startIcon={<GitHub />} fullWidth sx={{ mt: '20px', fontWeight: 600 }}>
        Login in with GitHub
      </Button>
      <Button variant='contained' startIcon={<DiscordIcon />} fullWidth sx={{ mt: '20px', fontWeight: 600 }}>
        Login in with Discord
      </Button>
      <Button variant='contained' startIcon={<SpotifyIcon />} fullWidth sx={{ mt: '20px', fontWeight: 600 }}>
        Login in with Spotify
      </Button>
    </Box>
  )
}
