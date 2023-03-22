import React from 'react'
import { GitHub } from '@mui/icons-material'
import { GoogleIcon } from './components/GoogleIcon'
import { SpotifyIcon } from './components/SpotifyIcon'
import { DiscordIcon } from './components/DiscordIcon'

interface Social {
  url: string
  label: string
  icon: React.ReactNode
}

const GOOGLE_REDIRECT = process.env.REACT_APP_API_URL + '/auth/google/login'
const GITHUB_REDIRECT = process.env.REACT_APP_API_URL + '/auth/github/login'
const SPOTIFY_REDIRECT = process.env.REACT_APP_API_URL + '/auth/spotify/login'
const DISCORD_REDIRECT = process.env.REACT_APP_API_URL + '/auth/discord/login'

export const SOCIALS: Social[] = [
  { url: GOOGLE_REDIRECT, label: 'Google', icon: <GoogleIcon /> },
  { url: GITHUB_REDIRECT, label: 'Github', icon: <GitHub /> },
  { url: SPOTIFY_REDIRECT, label: 'Spotify', icon: <SpotifyIcon /> },
  { url: DISCORD_REDIRECT, label: 'Spotify', icon: <DiscordIcon /> }
]
