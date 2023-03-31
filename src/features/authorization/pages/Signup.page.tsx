import React, { createContext, useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { useAppSelector } from 'application/store'

import { HOME_ROUTE } from 'shared/routes'
import { selectHasPassedWelcome, selectIsAuthenticated } from '../services'
import { Logo } from 'shared/components/icons/Logo'
import { VerticalStepper } from '../components/steppers/VerticalStepper'

import { DashedStepper } from '../components/steppers/DashedStepper'
import { CreateAccountForm } from '../components/forms/CreateAccount'
import { WelcomeForm } from '../components/forms/Welcome'
import { CongratulationsModal } from '../components/CongratulationsModal'
import { STEPS } from '../components/steppers/utils'
import Image from 'mui-image'
import { SocialLogin } from '../components/SocialLogin'

interface StepperContextType {
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

export const StepperContext = createContext<StepperContextType>({
  activeStep: 0,
  setActiveStep: () => {}
})
export const SignupPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const isUserPassedWelcome = useAppSelector(selectHasPassedWelcome)
  const navigate = useNavigate()
  useEffect(() => {
    if (isUserAuthenticated && isUserPassedWelcome) {
      navigate({ pathname: HOME_ROUTE.path })
      console.log('Already registered')
    } else if (!isUserAuthenticated) {
      setActiveStep(0)
      console.log('Not auth, in sign up form')
    } else if (isUserAuthenticated && !isUserPassedWelcome) {
      setActiveStep(1)
      console.log('Auth,but in welcome')
    }
  }, [])

  const getStepperComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <CreateAccountForm />
            <DashedStepper steps={2} />
          </>
        )
      case 1:
        return (
          <>
            <WelcomeForm />
            <DashedStepper steps={2} />
          </>
        )
      case STEPS.length - 1:
        return (
          <>
            <Typography fontSize={40} fontWeight={700} color="primary.lighter">
              Congratulate!
            </Typography>
            <CongratulationsModal />
          </>
        )
    }
  }
  return (
    <StepperContext.Provider value={{ activeStep, setActiveStep }}>
      <Box sx={{ flexGrow: 1, height: '100vh' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid
            item
            md={4}
            sx={{
              display: { xs: 'none', md: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
              backgroundColor: 'primary.dark',
              padding: '20px 30px'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
              <Box sx={{ userSelect: 'none' }}>
                <Logo
                  logoIcon={{
                    color: '#fff'
                  }}
                  textProps={{
                    color: '#fff'
                  }}
                />
              </Box>
              <VerticalStepper />
            </Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexDirection: { md: 'column', lg: 'row' }, gap: 2, userSelect: 'none' }}
            >
              <Stack direction="row" gap={1} alignItems="center">
                <CopyrightOutlinedIcon sx={{ color: 'primary.lighter', fontSize: 14 }} />
                <Typography sx={{ fontWeight: 400, fontSize: 14, color: 'primary.lighter' }}>Rickmorty API</Typography>
              </Stack>

              <Stack
                direction="row"
                gap={1}
                alignItems="center"
                component="a"
                href="mailto:rickandmorty@gmail.com"
                target="_blank"
                sx={{ textDecoration: 'none' }}
              >
                <EmailOutlinedIcon sx={{ color: 'primary.lighter', fontSize: 14 }} />
                <Typography sx={{ fontWeight: 400, fontSize: 14, color: 'primary.lighter' }}>
                  rickandmortyapi@gmail.com
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Container
              sx={{
                width: '300px',
                height: '100%',
                p: { xs: 0 },
                py: { xs: 5, md: 7 },
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {getStepperComponent()}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </StepperContext.Provider>
    /*    <Container sx={{ width: { xs: '100%', sm: 450, md: 600 }, p: { xs: 0 }, mt: { sm: 10 } }}>
      <Box
        component="main"
        sx={{
          border: '1px solid',
          borderColor: { xs: 'transparent', sm: 'primary.border' },
          borderRadius: '8px',
          minHeight: '500px',
          m: '0 auto',
          p: { xs: '20px 20px 18px', sm: '40px 40px 36px' },
          position: 'relative'
        }}
      >
        {isLoading && (
          <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, borderRadius: '8px 8px 0 0', width: '100%' }} />
        )}
        <Box
          component="img"
          sx={{ width: '100px' }}
          src="https://upload.wikimedia.org/wikipedia/ru/c/c8/Rick_and_Morty_logo.png"
        />
        <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Typography
            variant="h1"
            sx={{
              p: '16px 0 0',
              fontSize: 24,
              fontWeight: 500,
              opacity: 0.9
            }}
          >
            Sign up
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            p: '30px 0 0'
          }}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <ValidatedInput
            fullWidth
            size="small"
            autoComplete="off"
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            errorText={formik.errors.email || authBadCredentials?.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          <Grid container spacing={2} mt={2} mb={4}>
            <Grid item xs={12} sm={6}>
              <PasswordInput
                id="password"
                name="password"
                fullWidth
                size="small"
                label="Password"
                value={formik.values.password}
                errorText={formik.errors.password || authBadCredentials?.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput
                id="confirm-password"
                name="confirmPassword"
                fullWidth
                size="small"
                label="Confirm"
                value={formik.values.confirmPassword}
                errorText={!!formik.values.password ? formik.errors.confirmPassword : ''}
                onChange={formik.handleChange}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
          <Box
            component="div"
            sx={{
              mt: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Button
              variant="text"
              component={RouterLink}
              to="/signin"
              sx={{
                textTransform: 'initial',
                fontWeight: 600,
                padding: 0
              }}
              disabled={isLoading}
            >
              Sign in instead
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                textTransform: 'initial',
                fontWeight: 600
              }}
              disabled={isLoading}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>*/
  )
}
