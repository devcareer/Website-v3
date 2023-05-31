import { createTheme } from '@mui/material';
import GilroyBold from '../fonts/Gilroy/Gilroy-Bold.ttf';
import GilroyRegular from '../fonts/Gilroy/Gilroy-Regular.ttf';
import GilroySemiBold from '../fonts/Gilroy/Gilroy-SemiBold.ttf';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#05B993',
    },
    secondary: {
      main: '#34A0A4',
    },
    text: {
      primary: '#000000',
      grey: {
        800: '#363636',
        700: '#6D6D6D',
        600: '#888888',
        500: '#A3A3A3',
        A600: '#626262',
      },
    },
    background: {
      offwhite: '#FEFEFE',
      whitesmoke: '#F4F4F4',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
         @font-face {
          font-family: 'Gilroy';
          font-style: normal;
          font-display: auto;
          font-weight: 400;
          src: url(${GilroyRegular}) format('truetype');
         }
         @font-face {
          font-family: 'Gilroy';
          font-style: normal;
          font-display: auto;
          font-weight: 500;
          src: url(${GilroySemiBold}) format('truetype');
         }
         @font-face {
          font-family: 'Gilroy';
          font-style: normal;
          font-display: auto;
          font-weight: 700;
          src: url(${GilroyBold}) format('truetype');
         }
         body {
          font-family: 'Gilroy', Arial, sans-serif;
         }
        `,
    },
  },
  typography: {
    fontFamily: "'Gilroy', 'Arial', 'sans-serif'",
  },
});