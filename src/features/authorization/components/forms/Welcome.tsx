import React, { type FC, useContext, useEffect } from 'react'
import { Checkbox, Stack, Typography } from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined'

import { useAppSelector } from '@application/store'

import { useLogout, useWelcome } from '@features/authorization/hooks'
import { authHandler } from '@features/authorization/services'
import Title from '@features/authorization/components/titles/Signup'
import { StepperContext } from '@features/authorization/components/steppers'
import { selectCurrentUser } from '@features/users/services'

import { ValidatedInput } from '@shared/components/forms'
import { CountryAutocompleteInput } from '@shared/components/forms'
import { OutlinedButton } from '@shared/components/common/buttons'
import { PrimaryButton } from '@shared/components/common/buttons'

export const WelcomeForm: FC = () => {
  const { countries, formik, isLoading, error, isSuccess } = useWelcome()
  const { isLoading: isLogoutLoading, makeLogout } = useLogout()
  const authBadCredentials = authHandler(error)
  const user = useAppSelector(selectCurrentUser)
  const { setActiveStep } = useContext(StepperContext)

  useEffect(() => {
    if (isSuccess) {
      setActiveStep(prev => prev + 1)
    }
    /*  eslint-disable-next-line */
  }, [isSuccess])
  const onUseMyUsernameClick = () => {
    if (user) {
      const usernameFromEmail = user.email.split('@')[0]
      formik.setFieldValue('username', usernameFromEmail)
    }
  }

  console.log(formik.values.country)
  return (
    <Stack
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      direction="column"
      gap={4}
      width="100%"
      alignItems="center"
    >
      <Title.Welcome />
      <Stack direction="column" width="100%" gap={2}>
        <OutlinedButton onClick={onUseMyUsernameClick} disabled={isLoading}>
          Username from email
        </OutlinedButton>
        <ValidatedInput
          fullWidth
          name="username"
          label="Username"
          variant="outlined"
          value={formik.values.username}
          errorText={formik.errors.username || authBadCredentials?.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isLoading}
          size="small"
          helperText="You can use letters, numbers & periods"
        />
        <CountryAutocompleteInput
          items={countries}
          setFieldValue={formik.setFieldValue}
          onBlur={formik.handleBlur}
          errorText={formik.errors.country}
        />
        <Stack direction="row" alignItems="center" width="100%" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Subscribe to the newsletter?
          </Typography>
          <Checkbox
            id="mail_subscribe"
            name="mail_subscribe"
            checked={formik.values.mail_subscribe}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
        <Stack direction="column" gap={2} width="100%" sx={{ mt: 2 }}>
          <PrimaryButton startIcon={<DoneOutlineOutlinedIcon />} loading={isLoading} type="submit">
            Finish him!
          </PrimaryButton>
          <OutlinedButton startIcon={<LogoutOutlinedIcon />} loading={isLogoutLoading} onClick={makeLogout}>
            Sign out
          </OutlinedButton>
        </Stack>
      </Stack>
    </Stack>
  )
}
