import React, { FC } from 'react'
import { Box } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

export const SuccessIcon: FC = () => {
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: '#4dae191f',
        width: 'max-content',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50%',
        p: 1,
        mb: 1
      }}
    >
      <TaskAltIcon
        sx={{ fontSize: 50, backgroundColor: '#00800040', p: 1.3, borderRadius: '50%', color: 'success.main' }}
      />
    </Box>
  )
}
