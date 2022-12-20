import React, { FC } from "react";
import { ColorModeContext } from "../../App";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const ToggleMode: FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
      {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
