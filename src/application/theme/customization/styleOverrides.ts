import { Theme } from '@mui/material'

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
        height: '36px'
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
        '&.Mui-focused fieldset': {
          border: '1px solid !important',
          borderColor: `${theme.palette.primary.main} !important`
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
