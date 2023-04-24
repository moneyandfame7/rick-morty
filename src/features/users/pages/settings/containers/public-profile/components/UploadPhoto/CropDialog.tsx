import React, { createRef, type FC } from 'react'
import Cropper, { type ReactCropperElement } from 'react-cropper'

import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useAppSelector } from 'application/store'

import { selectCurrentUser, useUploadPhotoMutation } from 'features/users/services'

import { useActions } from 'shared/hooks'
import { PrimaryButton } from 'shared/components/common/buttons'

import './style.scss'

interface CropDialogProps {
  previewImage?: string
  onClose: () => void
  open: boolean
}
export const CropDialog: FC<CropDialogProps> = ({ previewImage, open, onClose }) => {
  const [upload, { isLoading }] = useUploadPhotoMutation()
  const { updateUser } = useActions()
  const cropperRef = createRef<ReactCropperElement>()
  const currentUser = useAppSelector(selectCurrentUser)

  if (!currentUser) {
    return null
  }
  const getCropData = async () => {
    if (cropperRef.current?.cropper) {
      const file = await fetch(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())
        .then(res => res.blob())
        .then(blob => new File([blob], currentUser.id, { type: 'image/png' }))
      return file
    }
  }

  const handleUploadImage = async () => {
    const file = await getCropData()
    if (file) {
      const formData = new FormData()
      formData.append('photo', file)
      const info = await upload(formData)
      if ('data' in info) {
        updateUser(info.data)
        onClose()
      }
    }
  }

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
      <DialogTitle fontWeight={600} fontSize={16}>
        Crop your new profile picture
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
        <Cropper
          ref={cropperRef}
          style={{ width: '100%' }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          aspectRatio={1 / 1}
          src={previewImage}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={false}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
      </DialogContent>
      <Divider sx={{ width: '100%' }} />
      <DialogActions
        sx={{
          p: '10px 20px',
          width: '100%'
        }}
      >
        <PrimaryButton fullWidth onClick={handleUploadImage} loading={isLoading}>
          Set new profile picture
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  )
}
