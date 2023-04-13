import React, { FC } from 'react'
import { Stack } from '@mui/material'

import { SOCIALS } from '@features/authorization/constant'
import { PrimaryButton } from '@shared/components/common/buttons'

export const SocialLogin: FC = () => {
  const socialLogin = (callbackUrl: string) => {
    window.open(callbackUrl, '_self')
  }
  return (
    <Stack direction="column" gap={'18px'} width="100%">
      {SOCIALS.map(social => (
        <PrimaryButton
          fullWidth
          key={social.id}
          startIcon={social.icon}
          onClick={() => {
            socialLogin(social.url)
          }}
        >
          Login with {social.label}
        </PrimaryButton>
      ))}
    </Stack>
  )
}
