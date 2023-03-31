import React, { FC, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'

import { useSignup } from 'features/authorization/hooks'
import { StepperContext } from 'features/authorization/pages'

import { ValidatedInput } from 'shared/components/Form/ValidatedInput'
import { PasswordInput } from 'shared/components/Form/PasswordInput'
import { PrimaryButton } from 'shared/components/common/buttons/PrimaryButton'
import { OutlinedButton } from 'shared/components/common/buttons/OutlinedButton'
import { LogoIcon } from 'shared/components/common/icons/LogoIcon'
import { errorHandler } from '../ErrorHandler'
import { SocialLogin } from '../SocialLogin'

export const CreateAccountForm: FC = () => {
  const theme = useTheme()
  const { formik, isLoading, error, isError, isSuccess } = useSignup()
  const [isSocial, setIsSocial] = useState(false)
  const { activeStep, setActiveStep } = useContext(StepperContext)
  useEffect(() => {
    if (isSuccess) {
      setActiveStep(prev => prev + 1)
    }
  }, [isSuccess])
  const authBadCredentials = errorHandler(error)
  return (
    <Stack direction="column" width="100%">
      <Box sx={{ width: '100%' }} component="form" onSubmit={formik.handleSubmit} noValidate>
        <Stack direction="column" gap={4} width="100%" alignItems="center">
          <Stack direction="column" gap="5px" alignItems="center">
            <LogoIcon color={theme.palette.primary.dark} />
            <Typography variant="h5" fontWeight="500" textAlign="center">
              Create an account
            </Typography>
            <Typography variant="body2" fontWeight="500" color="text.secondary" textAlign="center">
              Provide your email and password please.
            </Typography>
          </Stack>

          {isSocial ? (
            <SocialLogin />
          ) : (
            <Stack direction="column" width="100%" gap={2}>
              <ValidatedInput
                fullWidth
                autoComplete="off"
                type="email"
                name="email"
                size="small"
                label="Enter your email"
                variant="outlined"
                value={formik.values.email}
                errorText={formik.errors.email || authBadCredentials?.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
              <PasswordInput
                fullWidth
                autoComplete="new-password"
                name="password"
                size="small"
                label="Choose a password"
                value={formik.values.password}
                errorText={formik.errors.password || authBadCredentials?.password}
                onChange={formik.handleChange}
                disabled={isLoading}
              />
              <PasswordInput
                fullWidth
                autoComplete="new-password"
                name="confirmPassword"
                size="small"
                label="Confirm a password"
                value={formik.values.confirmPassword}
                errorText={!!formik.values.password ? formik.errors.confirmPassword : ''}
                onChange={formik.handleChange}
                disabled={isLoading}
              />
              <PrimaryButton type="submit" loading={isLoading}>
                Get started
              </PrimaryButton>
            </Stack>
          )}
        </Stack>
      </Box>
      <Divider
        flexItem
        sx={{
          my: 3,
          color: 'text.secondary',
          fontSize: 14,
          fontWeight: 500,
          '&: after': {
            top: 0
          },
          '&: before': {
            top: 0
          }
        }}
      >
        OR
      </Divider>
      <Stack direction="column" gap={3} width="100%">
        <OutlinedButton
          onClick={() => {
            setIsSocial(prev => !prev)
          }}
        >
          {!isSocial ? 'Social login' : 'With password and email'}
        </OutlinedButton>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Already have an account?{' '}
          <Typography
            component={Link}
            to="/login"
            sx={{
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
              color: 'primary.main'
            }}
          >
            Log in
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  )
}
