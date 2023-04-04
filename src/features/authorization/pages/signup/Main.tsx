import React, { FC, useContext } from 'react'
import { Container, Grid, Typography } from '@mui/material'

import { SignupForm } from 'features/authorization/components/forms'
import { WelcomeForm } from 'features/authorization/components/forms'
import { DashedStepper } from 'features/authorization/components/steppers'
import { StepperContext, STEPS } from 'features/authorization/components/steppers'
import { CongratulationsModal } from 'features/authorization/components'

export const Main: FC = () => {
  const { activeStep } = useContext(StepperContext)

  const getStepperComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <SignupForm />
            <DashedStepper />
          </>
        )
      case 1:
        return (
          <>
            <WelcomeForm />
            <DashedStepper />
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
    <Grid item xs={12} md={8}>
      <Container
        sx={{
          width: { xs: '90%', sm: '80%', md: '50%' },
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
  )
}
