import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material'

import { PrimaryButton } from 'shared/components/common/buttons'
import { HOME_ROUTE } from 'shared/routes'

export const CongratulationsModal: FC = () => {
  const { width, height } = useWindowSize()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(false)
    navigate({ pathname: HOME_ROUTE.path })
  }
  return (
    <>
      <Confetti
        gravity={0.02}
        numberOfPieces={200}
        recycle={false}
        width={width}
        height={height}
        initialVelocityX={8}
        initialVelocityY={3}
        confettiSource={{
          w: 10,
          h: 10,
          x: width / 2,
          y: height / 3
        }}
      />
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            alignItems: 'center',
            minWidth: { xs: '90%', md: '500px !important' },
            py: 3
          }
        }}
        sx={{ userSelect: 'none' }}
      >
        <DialogTitle id="responsive-dialog-title">
          <Stack direction="column" alignItems="center" gap={0.5}>
            <CheckCircleIcon sx={{ fontSize: 55, color: 'primary.main' }} />
            <Typography fontSize={20} fontWeight={600}>
              Whoooohoooo!
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Congratulations! You have finished!</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: '60%' }}>
          <PrimaryButton onClick={handleClose} fullWidth>
            Continue
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
