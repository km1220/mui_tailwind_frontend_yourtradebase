import { createTheme } from '@mui/material';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        // disableElevation: true,
        // disableFocusRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0',
          padding: '0.5rem 1rem',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%'
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%'
        }
      }
    },
    MUIRichTextEditor: {
      styleOverrides: {
        root: {
          border: `1px solid #c8cfd7`,
          borderRadius: '0.25rem',
          '& #mui-rte-Save-button': {
            border: '3px solid',
            borderRadius: '0.25rem'
          },
          '& ol, ul, menu': {
            margin: 0,
            marginLeft: '1rem',
            padding: 0
          },
          '& ul': {
            listStyle: 'disc !important',
          },
          '& ol': {
            listStyle: 'decimal !important',
          },
          '& blockquote': {
            paddingLeft: '1rem',
            borderLeft: '4px solid #c8cfd7',
          }
        },
        container: {
          margin: 0,
        },
        toolbar: {
          borderBottom: "1px solid gray"
        },
        editorContainer: {
          minHeight: '5rem',
          margin: 0,
          padding: '1rem',
        },
        editor: {
          backgroundColor: '#F9FAFC',
          minHeight: '5rem',
        }
      }
    }
  },
  palette: {
    common: {
      black: '#202020',
      white: '#e0e0e0',
      grey: "#979797",
    },
    neutral: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    action: {
      active: '#6B7280',
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)'
    },
    background: {
      default: '#f6f6f6',
      paper: '#F9FAFC',
    },

    divider: '#c8cfd7',
    // divider: '#3d4b59',
    primary: {
      main: '#3A4D81',
      light: '#2b56cd',
      dark: '#14234e',

      // main: '#5ac6ff',
      // light: '#f4fafe',
      // dark: '#009ef1',

      // main: '#fd5353',
      // light: '#e33fa1',
      // dark: '#ff0099',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#14B8A6',
      light: '#63e9da',
      dark: '#008777',

      // main: '#027e5e',
      // light: '#44814e',
      // dark: '#004008',
      contrastText: '#FFFFFF'
    },
    tertiary: {
      main: '#5c3383',
      light: '#9b31ff',
      dark: '#41007e',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#33cf4d',
      light: '#65C466',
      dark: '#2ECA45',

      // main: '#13a538',
      // light: '#9fc5a5',
      // dark: '#086e1a', 
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#2196F3',
      light: '#5ed9f5',
      dark: '#2d68f4',
      contrastText: '#FFFFFF'
    },
    warning: {
      // #ff984e
      main: '#FFB020',
      light: '#FFBF4C',
      dark: '#B27B16',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#ff1111',
      light: '#ff4a4a',
      dark: '#880000',
      contrastText: '#FFFFFF'
    },
    disabled: {
      main: '#8f919d',
      light: '#b9bac3',
      dark: '#4e5062',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#121828',
      secondary: '#65748B',
      disabled: 'rgba(55, 65, 81, 0.48)'
    },
    role: {
      admin: '#1F2937',
      fieldTeam: '#D1D5DB',
    },
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
    '0px 1px 2px rgba(100, 116, 139, 0.12)',
    '0px 1px 4px rgba(100, 116, 139, 0.12)',
    '0px 1px 5px rgba(100, 116, 139, 0.12)',
    '0px 1px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 6px rgba(100, 116, 139, 0.12)',
    '0px 3px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
    '0px 5px 12px rgba(100, 116, 139, 0.12)',
    '0px 5px 14px rgba(100, 116, 139, 0.12)',
    '0px 5px 15px rgba(100, 116, 139, 0.12)',
    '0px 6px 15px rgba(100, 116, 139, 0.12)',
    '0px 7px 15px rgba(100, 116, 139, 0.12)',
    '0px 8px 15px rgba(100, 116, 139, 0.12)',
    '0px 9px 15px rgba(100, 116, 139, 0.12)',
    '0px 10px 15px rgba(100, 116, 139, 0.12)',
    '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
    '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)'
  ],
  typography: {
    button: {
      fontWeight: 800
    },
    fontFamily: '"trade-gothic", "Helvetica Neue", Arial, Helvetica, sans-serif, system-ui',
    // fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontFamily: 'system-ui, san-serif',
      color: '#65748B',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    body2: {
      fontFamily: 'system-ui, san-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.75
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 700,
      lineHeight: 1.57
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase'
    },
    caption: {
      color: '#484c52',
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66
    },
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.375
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.375
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.375
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.375
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375
    }
  }
});
