import React, { useState } from 'react'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import { ColorModeContext } from "../../application";
import { IconButton, IconButtonProps, useTheme } from "@mui/material";

export const ColorSchemeToggle = ({ onClick, ...props }: IconButtonProps) => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [mounted, setMounted] = useState(false)


  return (

      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
      </IconButton>
  )
}
