import { ThemeOptions } from '../../../packages/penny/src/theme/types';
import { Spinner } from './loader';
import { CapOneLogo, CapOneLogoDark } from './logos';

export const capOneTheme: ThemeOptions = {
  loader: Spinner,
  logos: {
    light: CapOneLogo,
    dark: CapOneLogoDark,
  },
  fonts: {
    primary: 'Optimist',
  },
  textStyles: {
    heading3Semi: {
      fontSize: { s: '22px' },
      lineHeight: { s: '32px' },
    },
    body1Semi: {
      fontSize: { s: '22px' },
      lineHeight: { s: '32px' },
    },
    body1: {
      fontSize: { s: '22px' },
      lineHeight: { s: '32px' },
    },
    body2Semi: {
      fontSize: { s: '18px' },
    },
    body2: {
      fontSize: { s: '18px' },
    },
    body3Semi: {
      fontSize: { s: '16px' },
      lineHeight: { s: '24px' },
    },
    body3: {
      fontSize: { s: '16px' },
      lineHeight: { s: '24px' },
    },
    body4Semi: {
      fontSize: { s: '14px' },
      lineHeight: { s: '20px' },
    },
    body4: {
      fontSize: { s: '14px' },
      lineHeight: { s: '20px' },
    },
    body4SemiUpper: {
      fontSize: { s: '14px' },
      lineHeight: { s: '20px' },
    },
    body5SemiUpper: {
      fontSize: { s: '12px' },
    },
    caption1Semi: {
      fontSize: { s: '12px' },
      lineHeight: { s: '16px' },
    },
    caption1: {
      fontSize: { s: '12px' },
      lineHeight: { s: '16px' },
    },
    caption1SemiUpper: {
      fontSize: { s: '12px' },
      lineHeight: { s: '16px' },
    },
    caption2Semi: {
      fontSize: { s: '10px' },
      lineHeight: { s: '16px' },
    },
    inline: {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      fontWeight: 'inherit',
    },
  },
  colors: {
    global: {
      neutral: {
        100: '#ffffff',
        200: '#fafafa',
        300: '#e6e6e6',
        400: '#d7d7d7',
        500: '#c3cad5',
        600: '#afb0af',
        700: '#667085',
        800: '#676868',
        900: '#515252',
        1000: '#141414',
        A0: '#ffffff00',
        A15: '#ffffff26',
        A35: '#ffffff59',
        A60: '#ffffff99',
        A80: '#ffffffcc',
      },
      brand: {
        100: '#ebf8ff',
        200: '#8ab0c7',
        300: '#75a2bd',
        400: '#6492b0',
        500: '#608fae',
        600: '#598aaa',
        700: '#0276b1',
        800: '#026597',
        900: '#014e74',
        1000: '#013651',
      },
      brandSecondary: {
        100: '#ebf8ff',
        200: '#8ab0c7',
        300: '#75a2bd',
        400: '#6492b0',
        500: '#608fae',
        600: '#598aaa',
        700: '#0276b1',
        800: '#026597',
        900: '#014e74',
        1000: '#013651',
      },
      warning: {
        100: '#fff1d0',
        200: '#ffe7a7',
        300: '#ffe9b2',
        400: '#ffe299',
        500: '#ffd875',
        600: '#fdc535',
        700: '#f9c606',
        800: '#e8ad11',
        900: '#011728',
        1000: '#986e01',
      },
      success: {
        100: '#e9fce4',
        200: '#dae8d8',
        300: '#9bdab3',
        400: '#7dcf9d',
        500: '#54bf7e',
        600: '#41ae6c',
        700: '#25810e',
        800: '#1e6a0b',
        900: '#003903',
        1000: '#012811',
      },
      informative: {
        100: '#ebf8ff',
        200: '#8ab0c7',
        300: '#b5cefc',
        400: '#a2c1fb',
        500: '#8fb4fa',
        600: '#5484f8',
        700: '#0276b1',
        800: '#026597',
        900: '#014e74',
        1000: '#023d91',
      },
      critical: {
        100: '#fff0f0',
        200: '#f8ada4',
        300: '#f9b4ba',
        400: '#f79ca4',
        500: '#f57f89',
        600: '#f14755',
        700: '#d0021b',
        800: '#b70002',
        900: '#a3282b',
        1000: '#6d030d',
      },
      decorative: { 1: '#fff1d0', 2: '#c0e7f3', 3: '#b3cdde', 4: '#98d5ec', 5: '#dae8d8' },
    },
    components: {
      nakedButton: {
        secondary: {
          default: { color: 'link.rest' },
          hover: { color: 'link.hover' },
          active: { color: 'link.pressed' },
        },
      },
    },
    semantic: {
      link: {
        primary: {
          rest: '{global.brand.700}',
          hover: '{global.brand.800}',
          pressed: '{global.brand.900}',
        },
      },
    },
  },
};
