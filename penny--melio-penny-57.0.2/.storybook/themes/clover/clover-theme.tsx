import { ThemeOptions } from '../../../packages/penny/src/theme/types';
import { Spinner } from './loader';
import { CloverLogo, CloverLogoDark } from './logos';

export const cloverTheme: ThemeOptions = {
  loader: Spinner,
  logos: {
    light: CloverLogo,
    dark: CloverLogoDark,
  },
  fonts: {
    primary: 'Graphik, Helvetica, Arial, sans-serif',
  },
  colors: {
    global: {
      neutral: {
        100: '#ffffff',
        200: '#fbfbfb',
        300: '#e5e5e5',
        400: '#d8d8d8',
        500: '#c3cad5',
        600: '#c7c7c7',
        700: '#667085',
        800: '#8e8e90',
        900: '#5c5c5c',
        1000: '#000000',
        A0: '#ffffff00',
        A15: '#ffffff26',
        A35: '#ffffff59',
        A60: '#ffffff99',
        A80: '#ffffffcc',
      },
      brand: {
        100: '#f9fff7',
        200: '#f2fcee',
        300: '#e4f9dc',
        400: '#c9f3b9',
        500: '#97e878',
        600: '#43b02a',
        700: '#228800',
        800: '#276a16',
        900: '#1f5b10',
        1000: '#153d0b',
      },
      brandSecondary: {
        100: '#e6f3ff',
        200: '#d6ebff',
        300: '#c2e2ff',
        400: '#a3d3ff',
        500: '#66b6ff',
        600: '#339dff',
        700: '#3271ab',
        800: '#285a88',
        900: '#253338',
        1000: '#182225',
      },
      warning: {
        100: '#fff6cc',
        200: '#fff0ca',
        300: '#ffe9b2',
        400: '#ffe299',
        500: '#ffd875',
        600: '#fdc535',
        700: '#ffd100',
        800: '#e6a702',
        900: '#b88501',
        1000: '#986e01',
      },
      success: {
        100: '#f9fff7',
        200: '#b1e2c4',
        300: '#9bdab3',
        400: '#7dcf9d',
        500: '#54bf7e',
        600: '#41ae6c',
        700: '#228800',
        800: '#276a16',
        900: '#1f5b10',
        1000: '#012811',
      },
      informative: {
        100: '#e6f3ff',
        200: '#c7dafd',
        300: '#b5cefc',
        400: '#a2c1fb',
        500: '#8fb4fa',
        600: '#5484f8',
        700: '#339dff',
        800: '#2256d6',
        900: '#0351c0',
        1000: '#023d91',
      },
      critical: {
        100: '#ffeded',
        200: '#fac4c9',
        300: '#f9b4ba',
        400: '#f79ca4',
        500: '#f57f89',
        600: '#f14755',
        700: '#e70000',
        800: '#c60000',
        900: '#aa1111',
        1000: '#6d030d',
      },
      decorative: { 1: '#fff6cc', 2: '#ffe0d6', 3: '#fac4c9', 4: '#c7dafd', 5: '#f2fcee' },
    },
    semantic: {
      link: {
        primary: {
          rest: '{global.neutral.1000}',
          hover: '{global.brandSecondary.700}',
          pressed: '{global.brandSecondary.800}',
        },
      },
    },
    component: {
      button: {
        textSecondary: {
          rest: {
            label: '{semantic.link.primary.hover}',
          },
          hover: {
            label: '{semantic.link.primary.pressed}',
          },
          pressed: {
            label: '{semantic.link.primary.pressed}',
          },
        },
      },
    },
  },
};
