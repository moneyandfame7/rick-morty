import React, { FC, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Box, Divider, Stack, Typography } from '@mui/material'

import { useSignup } from '@features/authorization/hooks'
import { authHandler } from '@features/authorization/services'
import { SocialLogin } from '@features/authorization/components'
import { StepperContext } from '@features/authorization/components/steppers'
import Title from '@features/authorization/components/titles/Signup'

import { ValidatedInput } from '@shared/components/forms'
import { PasswordInput } from '@shared/components/forms'
import { PrimaryButton } from '@shared/components/common/buttons'
import { OutlinedButton } from '@shared/components/common/buttons'
export const SignupForm: FC = () => {
  const { formik, isLoading, error, isSuccess } = useSignup()
  const [isSocial, setIsSocial] = useState(false)
  const { setActiveStep } = useContext(StepperContext)
  useEffect(() => {
    if (isSuccess) {
      setActiveStep(prev => prev + 1)
    }
    /*  eslint-disable-next-line */
  }, [isSuccess])
  const authBadCredentials = authHandler(error)
  return (
    <Stack direction="column" width="100%">
      <Box sx={{ width: '100%' }} component="form" onSubmit={formik.handleSubmit} noValidate>
        <Stack direction="column" gap={4} width="100%" alignItems="center">
          <Title.CreateAccount />

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
                errorText={formik.values.password ? formik.errors.confirmPassword : ''}
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
