'use client';
import { BreakpointsOptions, Components, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    prime: Palette['primary'];
    accent: Palette['primary'];
    white: Palette['primary'];
  }

  interface PaletteOptions {
    prime?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    prime: true;
  }
  interface ButtonPropsColorOverrides {
    prime: true;
    accent: true;
    white: true;
  }
}

const breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1536,
  }
}

const components: Components = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: 'inherit',
        textTransform: 'none',
      },
      contained: {
        backgroundColor: 'var(--prime)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'var(--prime-hover)',
        },
        textTransform: 'none',
      },
      outlined: {
        backgroundColor: "var(--outlined-button-bg)",
        borderColor: 'var(--outlined-button-border)',
        color: 'var(--outlined-button-color)',
        textTransform: 'none',

        // '&:hover': {
        //   backgroundColor: '#faebf1',
        // },
      },
    }
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        variants: [
          {
            props: { severity: 'info' },
            style: {
              backgroundColor: '#60a5fa',
            },
          },
        ],
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fontSize: 'inherit',
      },
    },
  },
  MuiDialogContentText: {
    styleOverrides: {
      root: {
        color: 'hsl(210deg 11% 15% / 80%)',
      },
    },
  },
}

export const lightTheme = createTheme({
  breakpoints,
  typography: {
    fontFamily: 'var(--font-gotham-book)',
  },
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#7d2248',
      light: '#a52d5f',
      dark: '#3c1023',
      contrastText: '#f5f5f5',
    },
    accent: {
      main: "#d40f7d",
      light: "#f8a5c2",
      dark: "#a00056",
      contrastText: '#f5f5f5',
    },
    white: {
      main: "#f5f5f5",
      light: "#f9f9f9",
      dark: "#e0e0e0",
      contrastText: '#7d2248',
    },
    error: {
      main: '#bd2828',
    }
  },
  components
});

export const darkTheme = createTheme({
  breakpoints,
  typography: {
    fontFamily: 'var(--font-gotham-book)',
  },
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#ec1392',
      light: "#f8a5c2",
      dark: '#a00056',
      contrastText: '#fffafa',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 'inherit',
          textTransform: 'none',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 'inherit',
        },
      },
    },
  }
})