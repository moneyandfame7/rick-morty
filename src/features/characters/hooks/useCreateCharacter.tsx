import { useFormik } from 'formik'

import { useCreateCharacterMutation } from 'features/characters/services'
import type { CharacterGender, CharacterStatus, CreateCharacter } from 'features/characters/type'
import { createCharacterSchema } from 'shared/utils'

export const useCreateCharacter = () => {
  const [create, { error, isSuccess, isLoading }] = useCreateCharacterMutation()

  const onSubmit = async (values: CreateCharacter) => {
    const formData = new FormData()
    Object.keys(values).forEach(key => {
      formData.append(key, values[key as never])
    })
    // eslint-disable-next-line no-console
    const info = await create(formData)
    if ('data' in info) {
      console.log(info.data)
    }
  }

  const formik = useFormik<CreateCharacter>({
    initialValues: {
      name: '',
      type: '',
      species: '',
      status: '' as CharacterStatus,
      gender: '' as CharacterGender,
      image: {} as File
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: createCharacterSchema,
    onSubmit
  })

  return { formik, isLoading, error, isSuccess }
}
