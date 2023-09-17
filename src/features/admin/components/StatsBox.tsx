import { Box, Grid, type GridProps, Typography } from '@mui/material'
import React, { type PropsWithChildren, type FC } from 'react'

interface StatsBoxProps {
  title: string
}
export const StatsBox: FC<PropsWithChildren & GridProps & StatsBoxProps> = ({ children, title, ...props }) => {
  return (
    <Grid item {...props}>
      <Box bgcolor="background.default" borderRadius="12px" border="1px solid" borderColor="divider" p={2}>
        <Typography fontSize={22} fontWeight={600} color="text.secondary">
          {title}
        </Typography>
        {children}
      </Box>
    </Grid>
  )
}
