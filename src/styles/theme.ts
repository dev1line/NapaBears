import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    background: string;
  }
}

export const lightTheme: DefaultTheme = {
  primary: '#ABFF00',
  secondary: '#666',
  background: '#D0EFD1',
};

export const darkTheme: DefaultTheme = {
  primary: '#fff',
  secondary: '#cacaca',
  background: '#D0EFD1',
};

export const gridTheme = {
  gridColumns: 24, // default 12
  breakpoints: {
    // defaults below
    xxl: 1536,
    xl: 1280,
    lg: 1024,
    md: 768,
    sm: 640,
    xs: 300,
    // or you can use aliases
    // veryGiant: 1440,
    // giant: 1200,
    // desktop: 992,
    // tablet: 768,
    // phone: 576,
    // smaller: 575,
  },
  row: {
    padding: 15, // default 15
  },
  col: {
    padding: 15, // default 15
  },
  container: {
    padding: 15, // default 15
    maxWidth: {
      // defaults below
      xxl: 1536,
      xl: 1280,
      lg: 1024,
      md: 768,
      sm: 640,
      xs: 300,
      // or you can use aliases
      // veryGiant: 1141,
      // giant: 1140,
      // desktop: 960,
      // tablet: 720,
      // phone: 540,
      // smaller: 540,
    },
  },
};
