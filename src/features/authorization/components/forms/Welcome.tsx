import React, { FC, useContext, useEffect } from 'react'
import { useLogout, useWelcome } from 'features/authorization/hooks'
import { Box, Checkbox, Stack, Typography } from '@mui/material'
import { LogoIcon } from 'shared/components/common/icons/LogoIcon'
import { ValidatedInput } from 'shared/components/Form/ValidatedInput'
import { errorHandler } from '../ErrorHandler'
import { useAppSelector } from 'application/store'
import { selectCurrentUser } from 'features/users/services'
import { OutlinedButton } from 'shared/components/common/buttons/OutlinedButton'
import { CountryAutocompleteInput } from 'shared/components/Form/CountryAutocompleteInput'
import { PrimaryButton } from 'shared/components/common/buttons/PrimaryButton'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined'
import { StepperContext } from '../../pages'

export const WelcomeForm: FC = () => {
  const { countries, formik, isLoading, error, isSuccess } = useWelcome()
  const { isLoading: isLogoutLoading, makeLogout } = useLogout()
  const authBadCredentials = errorHandler(error)
  const user = useAppSelector(selectCurrentUser)
  const { activeStep, setActiveStep } = useContext(StepperContext)

  useEffect(() => {
    if (isSuccess) {
      setActiveStep(prev => prev + 1)
    }
  }, [isSuccess])
  const onUseMyUsernameClick = () => {
    if (user) {
      const usernameFromEmail = user.email.split('@')[0]
      formik.setFieldValue('username', usernameFromEmail)
    }
  }

  return (
    <Stack direction="column" width="100%">
      <Box sx={{ width: '100%' }} component="form" onSubmit={formik.handleSubmit} noValidate>
        <Stack direction="column" gap={4} width="100%" alignItems="center">
          <Stack direction="column" gap="5px" alignItems="center">
            <LogoIcon color="#fff" />
            <Typography variant="h5" fontWeight="500" textAlign="center">
              Welcome!
            </Typography>
            <Typography variant="body2" fontWeight="500" color="text.secondary" textAlign="center">
              Just a few questions to provide you with the best possible experience.
            </Typography>
          </Stack>
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
      </Box>
    </Stack>
  )
}
