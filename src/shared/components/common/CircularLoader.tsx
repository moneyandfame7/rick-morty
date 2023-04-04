import { FC } from 'react'
import { Box, CircularProgress, circularProgressClasses, useTheme } from '@mui/material'

export const CircularLoader: FC = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: theme => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
        }}
        size={30}
        thickness={5}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: theme => theme.palette.primary.main,
          animationDuration: '1000ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          }
        }}
        size={30}
        thickness={6}
      />
    </Box>
  )
}
