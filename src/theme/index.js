import { createTheme } from '@mui/material';
import GilroyBold from '../fonts/Gilroy/Gilroy-Bold.ttf';
import GilroyRegular from '../fonts/Gilroy/Gilroy-Regular.ttf';
import GilroySemiBold from '../fonts/Gilroy/Gilroy-SemiBold.ttf';
import EuclidBold from '../fonts/Euclid/Euclid-Circular-A-Bold.ttf';
import EuclidRegular from '../fonts/Euclid/Euclid-Circular-A-Regular.ttf';
import EuclidSemiBold from '../fonts/Euclid/Euclid-Circular-A-SemiBold.ttf';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#197a32',
    },
    secondary: {
      main: '#34A0A4',
    },
    navColor: {
      main: '#212121',
    },
    text: {
      primary: '#000000',
      black: {
        100: '#181818',
      },
      grey: {
        200: '#C2C2C2',
        300: '#212121',
        400: '#B2B2B2',
        800: '#363636',
        700: '#6D6D6D',
        600: '#888888',
        500: '#A3A3A3',
        900: '#7A7A7A',
        A600: '#626262',
      },
    },
    background: {
      offwhite: '#FEFEFE',
      whitesmoke: '#F4F4F4',
      lightgreen: '#E6F9F5',
    },
    misc: {
      100: '#131313',
    },
    yellow: {
      100: '#FAED5B',
      200: '#FFEC19',
    },
    green: {
      700: '#025C49',
      800: '#023E31',
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
         @font-face {
          font-family: 'Euclid';
          font-style: normal;
          font-display: auto;
          font-weight: 700;
          src: url(${EuclidBold}) format('truetype');
         }
         @font-face {
          font-family: 'Euclid';
          font-style: normal;
          font-display: auto;
          font-weight: 400;
          src: url(${EuclidRegular}) format('truetype');
         }
         @font-face {
          font-family: 'Euclid';
          font-style: normal;
          font-display: auto;
          font-weight: 600;
          src: url(${EuclidSemiBold}) format('truetype');
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
