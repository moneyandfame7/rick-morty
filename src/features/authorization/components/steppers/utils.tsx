import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { StepIconProps } from '@mui/material/StepIcon'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AdjustIcon from '@mui/icons-material/Adjust'

export const STEPS = [
  {
    label: 'Create an account',
    description: `Please provide your email and password`,
    id: 0
  },
  {
    label: 'Your details',
    description: `Just provide some details about you`,
    id: 1
  },
  {
    label: 'Congratulations',
    description: 'You have been finished!',
    id: 2
  }
]

const StepIconCompleted: FC = () => {
  return <CheckCircleIcon />
}
const StepIconActive: FC = () => {
  return (
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
      <Box sx={{ backgroundColor: 'primary.main', width: 9, height: 9, borderRadius: '50%' }}></Box>
    </Box>
  )
}
const StepIconBase: FC = () => {
  return <AdjustIcon sx={{ color: 'primary.lighter' }} />
}

export const StepIcon = (props: StepIconProps) => {
  const { active, completed } = props
  if (active) {
    return <StepIconActive />
  } else if (completed) {
    return <StepIconCompleted />
  } else {
    return <StepIconBase />
  }
}
