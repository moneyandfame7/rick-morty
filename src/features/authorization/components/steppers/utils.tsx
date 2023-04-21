import React, { createContext, FC } from 'react'
import Box from '@mui/material/Box'
import { StepIconProps } from '@mui/material/StepIcon'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AdjustIcon from '@mui/icons-material/Adjust'

interface StepperContextType {
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

export const StepperContext = createContext<StepperContextType>({
  activeStep: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveStep: () => {}
})

export const STEPS = [
  {
    label: 'Create an account',
    description: 'Please provide your email and password',
    id: 0
  },
  {
    label: 'Your details',
    description: 'Just provide some details about you',
    id: 1
  },
  {
    label: 'Congratulations',
    description: 'You have been finished!',
    id: 2
  }
]

const StepIconCompleted: FC = () => <CheckCircleIcon />
const StepIconActive: FC = () => (
  <Box
    sx={{
      backgroundColor: 'primary.lighter',
      width: 24,
      height: 24,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Box sx={{ backgroundColor: 'primary.main', width: 9, height: 9, borderRadius: '50%' }} />
  </Box>
)
const StepIconBase: FC = () => <AdjustIcon sx={{ color: 'primary.lighter' }} />

export const StepIcon: FC<StepIconProps> = ({ active, completed }) => {
  if (active) {
    return <StepIconActive />
  } else if (completed) {
    return <StepIconCompleted />
  } else {
    return <StepIconBase />
  }
}
