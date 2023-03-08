import { createTheme as createMuiTheme, PaletteMode } from "@mui/material";
import { getComponentOverrides } from "./theme/styleOverrides";


const getDesignTokens = (mode: PaletteMode) => ({
    palette:
      mode === "light"
        ? {
          mode,
          primary: {
            main: "#096bde",
          },
          background: {
            default: "#f7f7f8",
            paper: "#fff",
          },
        }
        : {
          mode,
          primary: {
            main: "#054da7",
            dark: "rgb(4 21 56)",
          },
          background: {
            default: "rgb(19 19 24)",
            paper: "#09090d",
          },
        },
    // components: {},
  }

);

export const createTheme = (mode: PaletteMode) => {
  const theme = createMuiTheme(getDesignTokens(mode));
  theme.components = getComponentOverrides(theme);

  return theme;
};