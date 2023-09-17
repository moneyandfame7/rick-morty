import React, { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Grid } from '@mui/material'

import { useAppSelector } from 'application/store'

import { selectHasPassedWelcome, selectIsAuthenticated } from 'features/authorization/services'
import { StepperContext } from 'features/authorization/components/steppers'

import { HOME_ROUTE } from 'shared/routes'

export const Root: FC<PropsWithChildren> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()

  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const isUserPassedWelcome = useAppSelector(selectHasPassedWelcome)

  useEffect(() => {
    if (isUserAuthenticated && isUserPassedWelcome) {
      navigate({ pathname: HOME_ROUTE.path })
    } else if (!isUserAuthenticated) {
      setActiveStep(0)
    } else if (isUserAuthenticated && !isUserPassedWelcome) {
      setActiveStep(1)
    }

    /*  eslint-disable-next-line */
  }, [])

  return (
    <StepperContext.Provider value={{ activeStep, setActiveStep }}>
      <Grid container sx={{ height: '100vh' }}>
        {children}
      </Grid>
    </StepperContext.Provider>
  )
}
