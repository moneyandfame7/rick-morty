import React, { type FC } from 'react'
import { Stack, Typography } from '@mui/material'

interface AdminHeaderProps {
  title: string
  subtitle: string
}

export const AdminHeader: FC<AdminHeaderProps> = ({ title, subtitle }) => {
  return (
    <Stack direction="column" gap={0} sx={{ py: 2 }}>
      <Typography sx={{ fontSize: { xs: 32, md: 40 } }} fontWeight={600}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: { xs: 14, md: 16 } }} fontWeight={500} color="text.secondary">
        {subtitle}
      </Typography>
    </Stack>
  )
}
