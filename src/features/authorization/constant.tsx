import React from 'react'
import { GitHub } from '@mui/icons-material'

import { environmentsConfig } from 'application/config'

import { GoogleIcon } from 'features/authorization/components/icons'
import { SpotifyIcon } from 'features/authorization/components/icons'
import { DiscordIcon } from 'features/authorization/components/icons'

interface Social {
  url: string
  label: string
  icon: React.ReactNode
  id: number
}

const GOOGLE_LOGIN = environmentsConfig.apiUrl + '/auth/google/login'
const GITHUB_LOGIN = environmentsConfig.apiUrl + '/auth/github/login'
const SPOTIFY_LOGIN = environmentsConfig.apiUrl + '/auth/spotify/login'
const DISCORD_LOGIN = environmentsConfig.apiUrl + '/auth/discord/login'

export const SOCIALS: Social[] = [
  { url: GOOGLE_LOGIN, label: 'Google', icon: <GoogleIcon />, id: 0 },
  { url: GITHUB_LOGIN, label: 'Github', icon: <GitHub />, id: 1 },
  { url: SPOTIFY_LOGIN, label: 'Spotify', icon: <SpotifyIcon />, id: 2 },
  { url: DISCORD_LOGIN, label: 'Discord', icon: <DiscordIcon />, id: 3 }
]

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  OWNER = 'owner'
}
export const privilegedRoles = [Role.ADMIN, Role.OWNER]
