import React from 'react'

import SmartToyIcon from '@mui/icons-material/SmartToy'
import LocationSearchingIcon from '@mui/icons-material/LocationSearching'
import MovieIcon from '@mui/icons-material/Movie'
interface ILinkConfig {
  url: string
  name: string
  id: number
  icon: React.ReactElement
  search: string
}

export const LINKS_CONFIG: ILinkConfig[] = [
  {
    id: 0,
    url: '/characters',
    search: '?page=1',
    name: 'Characters',
    icon: <SmartToyIcon />
  },
  {
    id: 1,
    url: '/episodes',
    search: '?page=1',
    name: 'Episodes',
    icon: <MovieIcon />
  },
  {
    id: 2,
    url: '/locations',
    search: '?page=1',
    name: 'Locations',
    icon: <LocationSearchingIcon />
  }
]
