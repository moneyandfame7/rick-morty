import { PaletteMode } from "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    neutral?: Palette["primary"];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

export const getDesignTokens = (mode: PaletteMode) => ({
  palette:
    mode === "light"
      ? {
          mode,
          background: {
            default: "#f7f7f8",
            paper: "#fff",
          },
          neutral: {
            main: "#bdbdbd",
          },
        }
      : {
          mode,
          primary: {
            main: "#a697ce",
          },
          neutral: {
            main: "#424242",
          },
          background: {
            default: "#000",
            paper: "#131318",
          },
        },
});
