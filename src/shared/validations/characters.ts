import * as yup from 'yup'

import type { CreateCharacterSchema } from './type'

export const createCharacterSchema = yup.object<CreateCharacterSchema>({
  name: yup.string().required('Enter a name'),
  type: yup.string().required('Enter a type'),
  status: yup.string().required('Enter a type').oneOf(['Alive', 'Dead', 'unknown']),
  gender: yup.string().required('Enter a gender').oneOf(['Female', 'Male', 'Genderless', 'unknown']),
  species: yup.string().required('Enter a species'),
  image: yup.mixed().nullable().required('A file is required')
})
