import React, { useState, type FC } from 'react'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { OutlinedButton } from './OutlinedButton'

interface CopyButtonProps {
  link: string
  children: string
}
export const CopyButton: FC<CopyButtonProps> = ({ link, children }) => {
  const [disabled, setDisabled] = useState(false)
  const [btnText, setBtnText] = useState(children)

  const handleClick = () => {
    navigator.clipboard.writeText(link)
    setDisabled(true)
    setBtnText('Copied')
    setTimeout(() => {
      setDisabled(false)
      setBtnText(children)
    }, 3000)
  }
  return (
    <OutlinedButton
      fullWidth
      startIcon={<ContentCopyOutlinedIcon sx={{ fontSize: '20px' }} />}
      onClick={handleClick}
      disabled={disabled}
    >
      {btnText}
    </OutlinedButton>
  )
}
