import * as React from 'react'
import { deepmerge } from '@mui/utils'
import type {} from '@mui/material/themeCssVarsAugmentation'
import {
  useColorScheme,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendMuiTheme,
  shouldSkipGeneratingVar as muiShouldSkipGeneratingVar,
  PaletteColor,
  TypeText,
  TypeAction,
  TypeBackground,
  CommonColors,
  Overlays,
  PaletteColorChannel,
  PaletteAlert,
  PaletteAppBar,
  PaletteAvatar,
  PaletteChip,
  PaletteFilledInput,
  PaletteLinearProgress,
  PaletteSlider,
  PaletteSkeleton,
  PaletteSnackbarContent,
  PaletteSpeedDialAction,
  PaletteStepConnector,
  PaletteStepContent,
  PaletteSwitch,
  PaletteTableCell,
  PaletteTooltip,
  Shadows,
  ZIndex
} from '@mui/material/styles'
import { blue, grey } from '@mui/material/colors'
import { extendTheme as extendJoyTheme, shouldSkipGeneratingVar as joyShouldSkipGeneratingVar } from '@mui/joy/styles'

// Material UI components
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

// Icons
import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightMode'

// Joy UI components
import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import JoyButton from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

import type {} from '@mui/material/themeCssVarsAugmentation'
import { FontSize, Theme as JoyTheme, ThemeCssVar as JoyThemeCssVar } from '@mui/joy/styles'

// extends Joy theme to include tokens from Material UI
declare module '@mui/joy/styles' {
  interface Palette {
    secondary: PaletteColorChannel
    error: PaletteColorChannel
    dividerChannel: string
    action: TypeAction
    Alert: PaletteAlert
    AppBar: PaletteAppBar
    Avatar: PaletteAvatar
    Chip: PaletteChip
    FilledInput: PaletteFilledInput
    LinearProgress: PaletteLinearProgress
    Skeleton: PaletteSkeleton
    Slider: PaletteSlider
    SnackbarContent: PaletteSnackbarContent
    SpeedDialAction: PaletteSpeedDialAction
    StepConnector: PaletteStepConnector
    StepContent: PaletteStepContent
    Switch: PaletteSwitch
    TableCell: PaletteTableCell
    Tooltip: PaletteTooltip
  }
  interface PalettePrimary extends PaletteColor {}
  interface PaletteInfo extends PaletteColor {}
  interface PaletteSuccess extends PaletteColor {}
  interface PaletteWarning extends PaletteColor {}
  interface PaletteCommon extends CommonColors {}
  interface PaletteText extends TypeText {}
  interface PaletteBackground extends TypeBackground {}

  interface ThemeVars {
    // attach to Joy UI `theme.vars`
    shadows: Shadows
    overlays: Overlays
    zIndex: ZIndex
  }
}

type MergedThemeCssVar = { [k in JoyThemeCssVar]: true }

declare module '@mui/material/styles' {
  interface Theme {
    // put everything back to Material UI `theme.vars`
    vars: JoyTheme['vars']
  }

  // makes Material UI theme.getCssVar() sees Joy theme tokens
  interface ThemeCssVarOverrides extends MergedThemeCssVar {}
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsSizeOverrides extends Record<keyof FontSize, true> {}

  interface SvgIconPropsColorOverrides {
    danger: true
    neutral: true
  }
}
const { unstable_sxConfig: muiSxConfig, ...muiTheme } = extendMuiTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          paper: 'red',
          default: '#f7f7f8'
        }
      }
    },
    dark: {
      palette: {
        background: {
          default: 'rgb(9 9 13)',
          paper: '#131318'
        }
      }
    }
  }
})

const { unstable_sxConfig: joySxConfig, ...joyTheme } = extendJoyTheme({
  cssVarPrefix: 'mui',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          ...blue,
          solidColor: 'var(--mui-palette-primary-contrastText)',
          solidBg: 'var(--mui-palette-primary-main)',
          solidHoverBg: 'var(--mui-palette-primary-dark)',
          plainColor: 'var(--mui-palette-primary-main)',
          plainHoverBg: 'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
          plainActiveBg: 'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
          outlinedBorder: 'rgba(var(--mui-palette-primary-mainChannel) / 0.5)',
          outlinedColor: 'var(--mui-palette-primary-main)',
          outlinedHoverBg: 'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
          outlinedHoverBorder: 'var(--mui-palette-primary-main)',
          outlinedActiveBg: 'rgba(var(--mui-palette-primary-mainChannel) / 0.3)'
        },
        background: {
          surface: '#fff',
          body: '#f7f7f8',
          default: 'red'
        },
        neutral: {
          ...grey
        },
        divider: 'var(--mui-palette-divider)',
        text: {
          tertiary: 'rgba(0 0 0 / 0.56)'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          ...blue,
          solidColor: '#fff',
          solidBg: '#054da7',
          solidHoverBg: '#02367d',
          plainColor: 'var(--mui-palette-primary-main)',
          plainHoverBg: 'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
          plainActiveBg: 'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
          outlinedBorder: 'rgba(var(--mui-palette-primary-mainChannel) / 0.5)',
          outlinedColor: '#addbff',
          outlinedHoverBg: 'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
          outlinedHoverBorder: 'var(--mui-palette-primary-main)',
          outlinedActiveBg: 'rgba(var(--mui-palette-primary-mainChannel) / 0.3)'
        },
        neutral: {
          ...grey
        },
        background: {
          body: 'rgb(9 9 13)',
          surface: '#131318'
        },
        divider: 'var(--mui-palette-divider)',
        text: {
          tertiary: 'rgba(255 255 255 / 0.5)'
        }
      }
    }
  },
  fontFamily: {
    display: '"Roboto","Helvetica","Arial",sans-serif',
    body: '"Roboto","Helvetica","Arial",sans-serif'
  },
  shadow: {
    xs: `var(--mui-shadowRing), ${muiTheme.shadows[1]}`,
    sm: `var(--mui-shadowRing), ${muiTheme.shadows[2]}`,
    md: `var(--mui-shadowRing), ${muiTheme.shadows[4]}`,
    lg: `var(--mui-shadowRing), ${muiTheme.shadows[8]}`,
    xl: `var(--mui-shadowRing), ${muiTheme.shadows[12]}`
  }
})

const mergedTheme = deepmerge(joyTheme, muiTheme) as unknown as ReturnType<typeof extendMuiTheme>

mergedTheme.unstable_sxConfig = {
  ...muiSxConfig,
  ...joySxConfig
}

export default mergedTheme

// declare module "@mui/material/styles" {
//   interface Palette {
//     neutral?: Palette["primary"];
//   }

//   interface PaletteOptions {
//     neutral?: PaletteOptions["primary"];
//   }
// }

// export const getDesignTokens = (mode: PaletteMode) => ({
//   palette:
//     mode === "light"
//       ? {
//           mode,
//           background: {
//             default: "#f7f7f8",
//             paper: "#fff",
//           },
//           neutral: {
//             main: "#bdbdbd",
//           },
//         }
//       : {
//           mode,
//           primary: {
//             main: "#ae72cc",
//           },
//           neutral: {
//             main: "#424242",
//           },
//           background: {
//             default: "#000",
//             paper: "#131318",
//           },
//         },

// });
