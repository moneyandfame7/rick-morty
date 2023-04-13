import { useFormik } from 'formik'

import { useCreateCharacterMutation } from '@features/characters/services'
import type { CreateCharacter } from '@features/characters/type'

import { createCharacterSchema } from '@shared/utils'

export const useCreateCharacter = () => {
  const [create, { data, error, isSuccess, isLoading }] = useCreateCharacterMutation()

  const onSubmit = async (values: CreateCharacter) => {
    const formData = new FormData()
    Object.keys(values).forEach(key => {
      formData.append(key, values[key as never])
    })
    await create(formData)
  }

  const formik = useFormik<CreateCharacter>({
    initialValues: {
      name: '',
      type: '',
      species: '',
      status: '',
      gender: '',
      image: null
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: createCharacterSchema,
    onSubmit
  })

  return { formik, isLoading, error, isSuccess, data }
}
