import { Theme } from '@mui/material'

export const getComponentOverrides = (theme: Theme): Theme['components'] => ({
  MuiFormLabel: {
    styleOverrides: {
      root: {
        // color: '#5f6368',
        fontWeight: 500
        // fontSize: 13
      }
    }
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        // color: '#5f6368',
        fontWeight: 500,
        fontSize: 11
      }
    }
  },
  // MuiDialog: {
  //   styleOverrides: {
  //     root: {
  //       backdropFilter: 'blur(8px)'
  //     }
  //   }
  // },
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
  // MuiSvgIcon: {
  //   styleOverrides: {
  //     root: {
  //       color: theme.palette.primary.lighter
  //       // fontSize: '1.25rem'
  //     }
  //   }
  // },
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
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main
        },
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
        fontWeight: 500,
        textTransform: 'initial'
      }
    }
  }
})
