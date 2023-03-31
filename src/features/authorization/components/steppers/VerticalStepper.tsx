import React, { FC, useContext } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Typography from '@mui/material/Typography'
import { StepperContext } from '../../pages'
import { StepIcon, STEPS } from './utils'
import { darken } from '@mui/material'

export const VerticalStepper: FC = () => {
  const { activeStep } = useContext(StepperContext)
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          '& .MuiStepConnector-line': {
            borderColor: 'primary.lighter',
            borderLeftWidth: '2px'
          }
        }}
      >
        {STEPS.map(step => (
          <Step key={step.id}>
            <StepLabel
              sx={{
                display: 'flex',
                '& .MuiStepLabel-labelContainer': {
                  color: '#fff'
                },
                '& .MuiStepLabel-label': {
                  fontWeight: '600 !important'
                },
                '& .Mui-active': {
                  color: '#fff !important'
                },
                '& .Mui-completed': {
                  color: darken('#fff', 0.15)
                }
              }}
              StepIconComponent={StepIcon}
            >
              {step.label}
            </StepLabel>
            <StepContent
              sx={step.id !== STEPS.length - 1 ? { borderLeft: '2px solid', borderLeftColor: 'primary.lighter' } : {}}
            >
              <Typography sx={{ fontWeight: 400, fontSize: 13, color: 'primary.lighter' }}>
                {step.description}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
