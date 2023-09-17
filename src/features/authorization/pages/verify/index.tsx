import React, { useEffect, type FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Container, Stack, Typography } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

import { useAppSelector } from 'application/store'

import { errorHandler, useVerifyMutation } from 'features/authorization/services'
import { selectCurrentUser } from 'features/users/services'

import { useActions } from 'shared/hooks'
import { HOME_ROUTE } from 'shared/routes'
import { CircularLoader } from 'shared/components/common'
import { BaseIcon, SuccessIcon } from 'shared/components/icons'
import { LinkButton } from 'shared/components/common/buttons'

export const VerifyPage: FC = () => {
  const [verify, { data, isSuccess, error }] = useVerifyMutation()
  const { setUser } = useActions()
  const { link } = useParams()
  const user = useAppSelector(selectCurrentUser)
  const verifyError = useMemo(() => errorHandler(error), [error])
  useEffect(() => {
    if (link) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        const info = await verify(link)
        if ('data' in info) {
          setUser(info.data.user)
        }
      })()
    }
  }, [link])

  const renderComponents = () => {
    switch (true) {
      case isSuccess && !!data:
        return (
          <Stack direction="column" alignItems="center">
            <SuccessIcon />
            <Typography fontWeight={600} fontSize={20}>
              Verify successed
            </Typography>

            <Typography
              color="text.secondary"
              fontWeight={500}
              fontSize={14}
              sx={{ pt: '5px', pb: '20px', maxWidth: 400 }}
            >
              The address <b>{user?.email}</b> is now a verified account. Click on the button to go to the home page.
            </Typography>
            <LinkButton variant="primary" size="small" to={{ pathname: HOME_ROUTE.path }}>
              Continue
            </LinkButton>
          </Stack>
        )
      case !!error && !!verifyError?.message:
        return (
          <Stack direction="column" alignItems="center">
            <BaseIcon icon={<CancelOutlinedIcon color="error" />} color="rgb(255, 72, 71)" />
            <Typography fontWeight={600} fontSize={20}>
              Verification failed
            </Typography>
            <Typography color="text.secondary" fontWeight={500} fontSize={14} sx={{ pt: '5px', pb: '20px' }}>
              {verifyError?.message}
            </Typography>
            <LinkButton variant="outlined" size="small" to={{ pathname: HOME_ROUTE.path }}>
              Go to home page
            </LinkButton>
          </Stack>
        )
      default:
        return (
          <Stack gap={1}>
            <CircularLoader />
            <Typography fontSize={14} fontWeight={500} color="text.secondary">
              We&apos;re verifying your account.
            </Typography>
          </Stack>
        )
    }
  }
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 20 }}>
      {renderComponents()}
    </Container>
  )
}
