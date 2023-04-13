import { useSearchParams } from 'react-router-dom'
import { Entities } from 'shared/constants'
import type { Filters } from '../types'
import { InputType } from '../constant'

export const useInitialFilters = (entity: Entities): Filters => {
  const [searchParams] = useSearchParams()
  switch (entity) {
    case Entities.CHARACTER:
      return {
        values: {
          name: searchParams.get('name') || '',
          status: searchParams.get('status') || '',
          gender: searchParams.get('gender') || '',
          species: searchParams.get('species') || '',
          take: searchParams.get('take') || '20'
        },
        type: {
          status: InputType.SELECT,
          species: InputType.SELECT,
          gender: InputType.SELECT,
          name: InputType.TEXT,
          take: InputType.NUMBER
        }
      }
    case Entities.EPISODE:
      return {
        values: {
          name: searchParams.get('name') || '',
          episode: searchParams.get('episode') || '',
          character_name: searchParams.get('character_name') || '',
          take: searchParams.get('take') || '20'
        },
        type: {
          name: InputType.TEXT,
          episode: InputType.TEXT /* TODO: мейбі зробити по іншому ( робити запит на список усіх епізодів і звідти
           брати список для select */,
          character_name: InputType.TEXT /*TODO: мейбі теж робити запит і отримувати список всіх персонажів*/,
          take: InputType.NUMBER
        }
      }
    case Entities.LOCATION:
      return {
        values: {
          name: searchParams.get('name') || '',
          dimension: searchParams.get('dimension') || '',
          resident_name: searchParams.get('resident_name') || '',
          type: searchParams.get('type') || '',
          take: searchParams.get('take') || '20'
        },
        type: {
          name: InputType.TEXT,
          dimension: InputType.TEXT,
          resident_name: InputType.TEXT,
          type: InputType.TEXT,
          take: InputType.NUMBER
        }
      }
  }
}
