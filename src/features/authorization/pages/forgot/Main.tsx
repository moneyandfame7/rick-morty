import React, { FC, useState } from 'react'

import { ForgotPasswordForm } from 'features/authorization/components/forms'
import { CheckEmail, GoBackButton } from 'features/authorization/components'
import { useForgot } from 'features/authorization/hooks'

export const Main: FC = () => {
  const { formik, isLoading, error, isSuccess, sendLink } = useForgot()
  const [isForgotForm, setIsForgotForm] = useState(true)

  return (
    <>
      {isForgotForm && !isSuccess ? (
        <ForgotPasswordForm formik={formik} isLoading={isLoading} error={error} />
      ) : (
        <CheckEmail
          email={formik.values.email}
          isLoading={isLoading}
          sendLink={sendLink}
          setIsForgotForm={setIsForgotForm}
        />
      )}
      <GoBackButton isLoading={isLoading} />
    </>
  )
}
