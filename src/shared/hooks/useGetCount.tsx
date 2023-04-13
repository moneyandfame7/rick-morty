import { useGetCountOfCharactersQuery } from '@features/characters/services'
import { useGetCountOfEpisodesQuery } from '@features/episodes/services'
import { useGetCountOfLocationsQuery } from '@features/locations'
import { useGetCountOfUsersQuery } from '@features/users/services'

interface CountType {
  count: number
  label: string
}

export const useGetCount = (): CountType[] | undefined => {
  const { data: countOfCharacters } = useGetCountOfCharactersQuery()
  const { data: countOfEpisodes } = useGetCountOfEpisodesQuery()
  const { data: countOfLocations } = useGetCountOfLocationsQuery()
  const { data: countOfUsers } = useGetCountOfUsersQuery()

  if (countOfUsers && countOfCharacters && countOfLocations && countOfEpisodes) {
    return [
      {
        count: countOfEpisodes,
        label: 'Episodes'
      },
      {
        count: countOfCharacters,
        label: 'Characters'
      },
      {
        count: countOfLocations,
        label: 'Locations'
      },
      {
        count: countOfUsers,
        label: 'Users'
      }
    ]
  }
}
