import React, { FC } from 'react'
import { Box, Button } from '@mui/material'
import { GitHub } from '@mui/icons-material'
import { GoogleIcon } from './GoogleIcon'
import { SpotifyIcon } from './SpotifyIcon'
import { DiscordIcon } from './DiscordIcon'

const GOOGLE_REDIRECT = process.env.REACT_APP_API_URL + '/auth/google/login'
const GITHUB_REDIRECT = process.env.REACT_APP_API_URL + '/auth/github/login'
const SPOTIFY_REDIRECT = process.env.REACT_APP_API_URL + '/auth/spotify/login'
const DISCORD_REDIRECT = process.env.REACT_APP_API_URL + '/auth/discord/login'

interface Social {
  url: string
  label: string
  icon: React.ReactNode
}

const socials: Social[] = [
  { url: GOOGLE_REDIRECT, label: 'Google', icon: <GoogleIcon /> },
  { url: GITHUB_REDIRECT, label: 'Github', icon: <GitHub /> },
  { url: SPOTIFY_REDIRECT, label: 'Spotify', icon: <SpotifyIcon /> },
  { url: DISCORD_REDIRECT, label: 'Spotify', icon: <DiscordIcon /> }
]

export const SocialLogin: FC = () => {
  const socialLogin = (callbackUrl: string) => {
    window.open(callbackUrl, '_self')
  }
  return (
    <Box component='div'>
      {socials.map((social, index) => (
        <Button
          fullWidth
          variant='contained'
          sx={{ fontWeight: 600, mt: index === 0 ? 0 : '20px' }}
          startIcon={social.icon}
          onClick={() => {
            socialLogin(social.url)
          }}
        >
          Login with {social.label}
        </Button>
      ))}
    </Box>
  )
}
