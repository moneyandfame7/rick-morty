import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Container } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

import { LOGIN_ROUTE } from '../routes'
import { ForgotPasswordForm } from '../components/ForgotPasswordForm'
import { useForgot } from '../hooks/useForgot'
import { CheckEmail } from '../components/CheckEmail'
import { GoBackButton } from '../components/GoBackButton'

export const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate()
  const { formik, isLoading, error, isSuccess, sendLink } = useForgot()
  const [isForgotForm, setIsForgotForm] = useState(true)
  const onClickBack = () => {
    navigate({ pathname: LOGIN_ROUTE.path })
  }
  return (
    <Container sx={{ width: { xs: '100%', sm: '450px' }, p: { xs: 0 }, mt: { xs: 7, sm: 10 } }}>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          mx: 'auto',
          gap: 4
        }}
      >
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
      </Box>
    </Container>
  )
}
