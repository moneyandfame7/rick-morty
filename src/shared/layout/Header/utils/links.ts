interface ILinkConfig {
  url: string
  name: string
  id: number
}

export const LINKS_CONFIG: ILinkConfig[] = [
  {
    url: '/characters?page=1',
    name: 'Characters',
    id: 0
  },
  {
    url: '/episodes?page=1',
    name: 'Episodes',
    id: 1
  },
  {
    url: '/locations?page=1',
    name: 'Locations',
    id: 2
  }
]
