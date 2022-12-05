import React, { FC } from "react";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import IconButton from "@mui/material/IconButton";
import { ColorModeContext } from "../../pages/App";
import { useTheme } from "@mui/material/styles";

const ToggleMode: FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  console.log(theme);
  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
      {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ToggleMode;
