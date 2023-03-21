import { FC } from 'react'
import { Box, Button } from '@mui/material'
import { GitHub } from '@mui/icons-material'
import { GoogleIcon } from './GoogleIcon'
import { SpotifyIcon } from './SpotifyIcon'
import { DiscordIcon } from './DiscordIcon'

const GOOGLE_REDIRECT = process.env.REACT_APP_API_URL + '/auth/google/login'
const GITHUB_REDIRECT = process.env.REACT_APP_API_URL + '/auth/github/login'
const SPOTIFY_REDIRECT = process.env.REACT_APP_API_URL + '/auth/spotify/login'
const DISCORD_REDIRECT = process.env.REACT_APP_API_URL + '/auth/discord/login'

export const SocialLogin: FC = () => {
  const socialLogin = (callbackUrl: string) => {
    window.open(callbackUrl, '_self')
  }
  console.log(process.env.NODE_ENV)
  return (
    <Box component='div'>
      <Button
        variant='contained'
        sx={{ fontWeight: 600 }}
        startIcon={<GoogleIcon />}
        fullWidth
        onClick={() => {
          socialLogin(GOOGLE_REDIRECT)
        }}
      >
        Login in with Google
      </Button>
      <Button
        variant='contained'
        startIcon={<GitHub />}
        fullWidth
        sx={{ mt: '20px', fontWeight: 600 }}
        onClick={() => {
          socialLogin(GITHUB_REDIRECT)
        }}
      >
        Login in with GitHub
      </Button>
      <Button
        variant='contained'
        startIcon={<DiscordIcon />}
        fullWidth
        sx={{ mt: '20px', fontWeight: 600 }}
        onClick={() => {
          socialLogin(DISCORD_REDIRECT)
        }}
      >
        Login in with Discord
      </Button>
      <Button
        variant='contained'
        startIcon={<SpotifyIcon />}
        fullWidth
        sx={{ mt: '20px', fontWeight: 600 }}
        onClick={() => {
          socialLogin(SPOTIFY_REDIRECT)
        }}
      >
        Login in with Spotify
      </Button>
    </Box>
  )
}
