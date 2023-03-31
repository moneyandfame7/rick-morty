import { darken, lighten, Theme } from '@mui/material'

export const getComponentOverrides = (theme: Theme): Theme['components'] => ({
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontWeight: 500
      }
    }
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        fontSize: 11
      }
    }
  },
  MuiInputBase: {
    styleOverrides: {
      sizeSmall: {
        height: '40px'
      }
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: 4
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none'
      }
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        backgroundColor: theme.palette.mode === 'dark' ? '#000' : '',
        fieldset: {
          transition: 'all 0.2s'
        },
        '&: hover fieldset': {
          borderColor: `${theme.palette.primary.main} !important`
        },
        '&.Mui-focused fieldset': {
          border: `1px solid ${theme.palette.primary.main}`,
          borderWidth: '1px !important'
        },
        '&.Mui-error': {
          fieldset: {
            borderColor: `#f44336 !important`
          },
          '&: hover fieldset': {
            borderColor: `#f44336 !important`
          }
        }
      },
      input: {
        '&:-webkit-autofill': {
          WebkitBoxShadow: `0 0 0 100px ${
            theme.palette.mode === 'dark'
              ? lighten(theme.palette.background.default, 0.07)
              : darken(theme.palette.background.default, 0.03)
          } inset`,
          WebkitTextFillColor: theme.palette.text.primary
        }
      }
    }
  },

  MuiSelect: {
    styleOverrides: {
      icon: {
        opacity: 0.7
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: 600,
        textTransform: 'initial'
      }
    }
  }
})
