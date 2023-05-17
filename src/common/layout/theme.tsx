import { Roboto } from 'next/font/google';
import { createTheme, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});

export const colors = {
  green: '#61ce70',
  blue: '#79def2',
  red: '#f44336',
  black: '#000000',
  white: '#ffffff'
};

// Create a theme instance.
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: colors.black
    },
    secondary: {
      main: colors.green,
      light: colors.blue
    },
    error: {
      main: colors.red
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.blue
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '0'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: colors.green
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          textAlign: 'center'
        }
      }
    }
  }
});

export default theme;
