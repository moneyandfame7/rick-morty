import { MobileStepper } from '@mui/material'
import { FC, useContext } from 'react'
import { StepperContext } from 'features/authorization/pages'

interface DashedStepperProps {
  steps: number
}

export const DashedStepper: FC<DashedStepperProps> = ({ steps }) => {
  const { activeStep } = useContext(StepperContext)
  return (
    <MobileStepper
      variant="dots"
      steps={steps}
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
