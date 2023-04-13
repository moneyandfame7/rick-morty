import React, { FC, useState } from 'react'
import { Grid } from '@mui/material'

import { SocialLogin } from '@features/authorization/components'
import { LoginForm } from '@features/authorization/components/forms'
import { LoginTitle } from '@features/authorization/components/titles'

import { OutlinedButton } from '@shared/components/common/buttons'

export const Content: FC = () => {
  const [isSocial, setIsSocial] = useState<boolean>(false)

  return (
    <Grid item xs={9} sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: { xs: '95%', sm: '90%' } }}>
      <LoginTitle />
      {isSocial ? <SocialLogin /> : <LoginForm />}
      <OutlinedButton
        onClick={() => {
          setIsSocial(prev => !prev)
        }}
      >
        {!isSocial ? 'Social login' : 'With password and email'}
      </OutlinedButton>
    </Grid>
  )
}
