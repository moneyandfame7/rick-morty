import React, { type FC, useContext } from 'react'
import { MobileStepper } from '@mui/material'

import { StepperContext, STEPS } from './utils'

export const DashedStepper: FC = () => {
  const { activeStep } = useContext(StepperContext)
  return (
    <MobileStepper
      variant="dots"
      steps={STEPS.length}
      position="static"
      activeStep={activeStep}
      sx={{
        height: 'max-content',
        '& .MuiMobileStepper-dot': {
          width: '80px',
          height: '8px',
          borderRadius: '4px'
        }
      }}
      backButton={<></>}
      nextButton={<></>}
    />
  )
}
