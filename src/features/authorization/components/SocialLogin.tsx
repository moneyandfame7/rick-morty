import React, { FC } from 'react'
import { Box, Button } from '@mui/material'
import { SOCIALS } from '../constant'

export const SocialLogin: FC = () => {
  const socialLogin = (callbackUrl: string) => {
    window.open(callbackUrl, '_self')
  }
  return (
    <Box component='div'>
      {SOCIALS.map((social, index) => (
        <Button
          fullWidth
          variant='contained'
          sx={{ fontWeight: 600, mt: index === 0 ? 0 : '20px' }}
          startIcon={social.icon}
          onClick={() => {
            socialLogin(social.url)
          }}
        >
          Login with {social.label}
        </Button>
      ))}
    </Box>
  )
}
