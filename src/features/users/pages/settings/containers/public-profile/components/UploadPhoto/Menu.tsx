import React, { useCallback, type FC, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Menu, MenuItem } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

import { useEditSettings } from 'features/users/hooks'

import { OutlinedButton } from 'shared/components/common/buttons'
import { useActions } from 'shared/hooks'

import { CropDialog } from './CropDialog'

export const EditMenu: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const [showDialog, setShowDialog] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleCloseMenu()
    handleOpenDialog()
    setPreviewImage(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const { updateUser } = useActions()
  const { update } = useEditSettings()

  const handleOpenDialog = () => {
    setShowDialog(true)
  }
  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleRevertImage = async () => {
    const info = await update({ photo: null as unknown as undefined })
    if ('data' in info) {
      updateUser(info.data)
      handleCloseMenu()
    }
  }
  return (
    <>
      <OutlinedButton
        startIcon={<EditOutlinedIcon />}
        sx={{ position: 'absolute', bottom: 10, left: 0 }}
        onClick={handleOpenMenu}
      >
        Edit
      </OutlinedButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <MenuItem disableRipple sx={{ fontSize: 14, fontWeight: 500, gap: 1 }} {...getRootProps()}>
          <input {...getInputProps()} />
          <DriveFolderUploadOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          Upload a photo...
        </MenuItem>
        <MenuItem disableRipple sx={{ fontSize: 14, fontWeight: 500, gap: 1 }} onClick={handleRevertImage}>
          <DeleteForeverOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          Revert to default
        </MenuItem>
      </Menu>
      <CropDialog previewImage={previewImage} open={showDialog} onClose={handleCloseDialog} />
    </>
  )
}
