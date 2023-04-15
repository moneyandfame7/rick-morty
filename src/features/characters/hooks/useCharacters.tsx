import { useSearchParams } from 'react-router-dom'

import { useGetManyCharactersQuery } from 'features/characters/services'
import { useInitialFilters } from 'features/filters/hooks'

import { Entities } from 'shared/constants'

export const useCharacters = () => {
  const [searchParams] = useSearchParams()
  const currentTake = Number(searchParams.get('take')) || 20
  const filters = useInitialFilters(Entities.CHARACTER)

  const { data, isFetching, error } = useGetManyCharactersQuery(searchParams.toString())

  return {
    currentTake,
    data,
    isFetching,
    error,
    filters
  }
}
