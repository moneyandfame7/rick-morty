import React, { useState, type FC } from 'react'

import { Subheader } from 'features/users/pages/settings/components'
import { Typography } from '@mui/material'
import { OutlinedButton } from 'shared/components/common/buttons'
import { ConfirmDialog } from './components/ConfirmDialog'

export const AdminContainer: FC = () => {
  const [showDialog, setShowDialog] = useState(false)

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  const handleOpenDialog = () => {
    setShowDialog(true)
  }
  return (
    <>
      <Subheader title="Delete account" color="error.main" />
      <Typography fontWeight={500} fontSize={14} sx={{ my: 2, maxWidth: { xs: '100%', lg: '80%' } }}>
        Once you delete your account, there is no going back. Please be certain.
      </Typography>
      <OutlinedButton size="medium" onClick={handleOpenDialog}>
        Delete your account
      </OutlinedButton>
      <ConfirmDialog open={showDialog} onClose={handleCloseDialog} />
    </>
  )
}
