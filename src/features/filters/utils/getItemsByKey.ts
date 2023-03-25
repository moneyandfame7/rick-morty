import { GENDERS, SPECIES, STATUSES } from '../constant'

export const getItemsByKey = (key: string) => {
  switch (key) {
    case 'species':
      return SPECIES

    case 'status':
      return STATUSES

    case 'gender':
      return GENDERS

    default:
      return []
  }
}
