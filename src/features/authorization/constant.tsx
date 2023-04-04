import React from 'react'
import { GitHub } from '@mui/icons-material'

import { GoogleIcon } from 'features/authorization/components/icons'
import { SpotifyIcon } from 'features/authorization/components/icons'
import { DiscordIcon } from 'features/authorization/components/icons'

interface Social {
  url: string
  label: string
  icon: React.ReactNode
  id: number
}

const GOOGLE_REDIRECT = import.meta.env.VITE_API_URL + '/auth/google/login'
const GITHUB_REDIRECT = import.meta.env.VITE_API_URL + '/auth/github/login'
const SPOTIFY_REDIRECT = import.meta.env.VITE_API_URL + '/auth/spotify/login'
const DISCORD_REDIRECT = import.meta.env.VITE_API_URL + '/auth/discord/login'

export const SOCIALS: Social[] = [
  { url: GOOGLE_REDIRECT, label: 'Google', icon: <GoogleIcon />, id: 0 },
  { url: GITHUB_REDIRECT, label: 'Github', icon: <GitHub />, id: 1 },
  { url: SPOTIFY_REDIRECT, label: 'Spotify', icon: <SpotifyIcon />, id: 2 },
  { url: DISCORD_REDIRECT, label: 'Spotify', icon: <DiscordIcon />, id: 3 }
]
