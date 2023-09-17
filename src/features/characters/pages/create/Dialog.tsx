import React, { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Image from 'mui-image'

import { Dialog, DialogActions, DialogContent, Grid, Stack, Typography } from '@mui/material'

import { MAIN_CHARACTER_ROUTE } from 'features/characters/routes'
import type { Character } from 'features/characters/type'

import { Navigation } from 'shared/constants'
import { CopyButton, PrimaryButton } from 'shared/components/common/buttons'

interface SuccessfullyCreatedDialogProps {
  createdCharacter: Character
}
export const SuccessfullyCreatedDialog: FC<SuccessfullyCreatedDialogProps> = ({ createdCharacter }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  const onBackdropClick = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          alignItems: 'center',
          width: { xs: '90%', md: '400px !important' },
          p: { xs: '12px', md: '24px' }
        }
      }}
      sx={{ userSelect: 'none' }}
      onClose={onBackdropClick}
    >
      <DialogContent sx={{ p: 0 }}>
        <Stack gap={1.5} alignItems="center">
          <Image
            src={createdCharacter.image}
            width="100%"
            height="200px"
            duration={300}
            style={{
              borderRadius: 8
            }}
          />
          <Typography fontSize={18} fontWeight={500} textAlign="center">
            Character created
          </Typography>
          <Typography fontSize={14} color="text.secondary" textAlign="center">
            The character has been created. You can see it on the character&apos;s main page at the end.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          mt: 1,
          p: 0,
          width: '100%'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
            <CopyButton link={`${location.origin}/${Navigation.CHARACTERS}/${createdCharacter.id}`}>
              Copy link
            </CopyButton>
          </Grid>

          <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
            <PrimaryButton
              fullWidth
              onClick={() => {
                navigate({ pathname: MAIN_CHARACTER_ROUTE.path })
              }}
            >
              Main page
            </PrimaryButton>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}
