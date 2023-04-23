import React, { useState, type FC, useEffect } from 'react'

import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { OutlinedButton, PrimaryButton } from 'shared/components/common/buttons'
import { ValidatedInput } from 'shared/components/forms'
import { selectCurrentUser, useDeleteUserMutation } from 'features/users/services'
import { useAppSelector } from 'application/store'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from 'features/authorization/routes'
import { useActions } from 'shared/hooks'

interface DialogProps {
  onClose: () => void
  open: boolean
}
export const ConfirmDialog: FC<DialogProps> = ({ onClose, open }) => {
  const currentUser = useAppSelector(selectCurrentUser)
  const { removeUser } = useActions()
  const [inputValue, setInputValue] = useState('')
  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation()
  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const navigate = useNavigate()
  const onButtonClick = async () => {
    if (currentUser) {
      await deleteUser(currentUser.id)
      removeUser()
    }
  }
  useEffect(() => {
    if (isSuccess) {
      onClose()
      navigate({ pathname: LOGIN_ROUTE.path })
    }
  }, [isSuccess])
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          width: { xs: '90%', md: '400px !important' }
        }
      }}
      sx={{ userSelect: 'none' }}
      onClose={onClose}
    >
      <DialogTitle fontSize={16}>
        Type <b>&quot;delete&quot;</b> to continute.
        <IconButton
          disableTouchRipple
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary'
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '24px' }}>
        <ValidatedInput
          required
          onChange={onChangeInput}
          inputProps={{ maxLength: 6 }}
          name="delete"
          size="small"
          fullWidth
        />
      </DialogContent>
      <Divider sx={{ width: '100%' }} />
      <DialogActions
        sx={{
          p: '10px 20px',
          width: '100%'
        }}
      >
        <OutlinedButton onClick={onButtonClick} loading={isLoading} size="medium" disabled={inputValue !== 'delete'}>
          Confirm
        </OutlinedButton>
      </DialogActions>
    </Dialog>
  )
}
