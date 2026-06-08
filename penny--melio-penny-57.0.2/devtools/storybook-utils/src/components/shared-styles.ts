import { SystemStyleObject } from '@chakra-ui/react';

export const FONT_FAMILY = 'Poppins, system-ui, sans-serif';
export const FONT_WEIGHT = 400;

export const textStyles: SystemStyleObject = {
  fontFamily: FONT_FAMILY,
  fontWeight: FONT_WEIGHT,
};

export const colorPalettes = {
  neutral: {
    100: '#ffffff',
    200: '#f8fafc',
    300: '#f1f5f8',
    400: '#e4e7ec',
    500: '#c3cad5',
    600: '#7C879C',
    700: '#646F87',
    800: '#475467',
    900: '#344054',
    1000: '#18191b',
    A0: '#ffffff00',
    A15: '#ffffff26',
    A35: '#ffffff59',
    A60: '#ffffff99',
    A80: '#ffffffcc',
  },
  brand: {
    100: '#f3f0ff',
    200: '#e4dbff',
    300: '#d9ccff',
    400: '#c9b6ff',
    500: '#b79eff',
    600: '#9470ff',
    700: '#7849ff',
    800: '#5f33e6',
    900: '#4315cb',
    1000: '#321098',
  },
  brandSecondary: {
    100: '#f3f0ff',
    200: '#e4dbff',
    300: '#d9ccff',
    400: '#c9b6ff',
    500: '#b79eff',
    600: '#9470ff',
    700: '#7849ff',
    800: '#5f33e6',
    900: '#4315cb',
    1000: '#321098',
  },
  warning: {
    100: '#fff8e6',
    200: '#fff0ca',
    300: '#ffe9b2',
    400: '#ffe299',
    500: '#ffd875',
    600: '#fdc535',
    700: '#fdb702',
    800: '#e6a702',
    900: '#b88501',
    1000: '#986e01',
  },
  success: {
    100: '#dff5e7',
    200: '#b1e2c4',
    300: '#9bdab3',
    400: '#7dcf9d',
    500: '#54bf7e',
    600: '#41ae6c',
    700: '#028838',
    800: '#00702d',
    900: '#014b1f',
    1000: '#012811',
  },
  informative: {
    100: '#e6f0fe',
    200: '#c7dafd',
    300: '#b5cefc',
    400: '#a2c1fb',
    500: '#8fb4fa',
    600: '#5484f8',
    700: '#306af7',
    800: '#2256d6',
    900: '#0351c0',
    1000: '#023d91',
  },
  critical: {
    100: '#fde7e9',
    200: '#fac4c9',
    300: '#f9b4ba',
    400: '#f79ca4',
    500: '#f57f89',
    600: '#f14755',
    700: '#d80e25',
    800: '#c50c22',
    900: '#8d0411',
    1000: '#6d030d',
  },
  decorative: { 1: '#ead6d4', 2: '#ffe0d6', 3: '#ffd0ea', 4: '#d9e1fd', 5: '#c9f8f8' },
  focus: { primary: '#0548cf', inverse: '#3798f2' },
};

export const tableRowBackgroundStyles = { backgroundColor: colorPalettes.neutral['100'] };

export const tableHeaderStyles = {
  backgroundColor: colorPalettes.neutral['300'],
  height: '40px',
};

export const tableBorderStyles = { border: `1px solid ${colorPalettes.neutral['400']}` };
