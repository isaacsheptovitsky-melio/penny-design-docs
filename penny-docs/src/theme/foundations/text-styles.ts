import { type ChakraTheme, type ResponsiveValue, type SystemStyleObject } from '@chakra-ui/react';

type TextStyle = Pick<SystemStyleObject, 'fontWeight' | 'textTransform' | 'letterSpacing' | 'fontFamily'> & {
  fontSize?: ResponsiveValue<string | number>;
  lineHeight?: ResponsiveValue<string | number>;
};

export const textStyles = {
  display1Semi: {
    fontFamily: 'primary',
    fontSize: { xs: '40px', s: '48px' },
    lineHeight: { xs: '48px', s: '60px' },
    fontWeight: 600,
  },
  display2Semi: {
    fontFamily: 'primary',
    fontSize: { xs: '32px', s: '40px' },
    lineHeight: { xs: '40px', s: '48px' },
    fontWeight: 600,
  },
  display2: {
    fontFamily: 'primary',
    fontSize: { xs: '32px', s: '40px' },
    lineHeight: { xs: '40px', s: '48px' },
    fontWeight: 400,
  },
  heading1Semi: {
    fontFamily: 'primary',
    fontSize: { xs: '28px', s: '32px' },
    lineHeight: { xs: '36px', s: '40px' },
    fontWeight: 600,
  },
  heading2Semi: {
    fontFamily: 'primary',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 600,
  },
  heading2: {
    fontFamily: 'primary',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 400,
  },
  heading3Semi: {
    fontFamily: 'primary',
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 600,
  },
  metric1Semi: {
    fontFamily: 'primary',
    fontSize: { xs: '28px', s: '32px' },
    lineHeight: { xs: '36px', s: '40px' },
    fontWeight: 600,
  },
  metric2Semi: {
    fontFamily: 'primary',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 600,
  },
  body1Semi: {
    fontFamily: 'primary',
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 600,
  },
  body1: {
    fontFamily: 'primary',
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 400,
  },
  body2Semi: {
    fontFamily: 'primary',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 600,
  },
  body2: {
    fontFamily: 'primary',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,
  },
  body3Semi: {
    fontFamily: 'primary',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 600,
  },
  body3: {
    fontFamily: 'primary',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
  },
  body4Semi: {
    fontFamily: 'primary',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 600,
  },
  body4: {
    fontFamily: 'primary',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
  },
  body4SemiUpper: {
    fontFamily: 'primary',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  body5SemiUpper: {
    fontFamily: 'primary',
    fontSize: '10px',
    lineHeight: '16px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  caption1Semi: {
    fontFamily: 'primary',
    fontSize: '10px',
    lineHeight: '14px',
    fontWeight: 600,
    letterSpacing: '0.2px',
  },
  caption1: {
    fontFamily: 'primary',
    fontSize: '10px',
    lineHeight: '14px',
    fontWeight: 400,
    letterSpacing: '0.2px',
  },
  caption1SemiUpper: {
    fontFamily: 'primary',
    fontSize: '10px',
    lineHeight: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.2px',
  },
  caption2Semi: {
    fontFamily: 'primary',
    fontSize: '8px',
    lineHeight: '12px',
    fontWeight: 600,
    letterSpacing: '0.2px',
  },
  inline: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontWeight: 'inherit',
  },
};

export type TextStyleKey = keyof typeof textStyles | (string & {});

export type ThemeTextStyles = Record<TextStyleKey, TextStyle>;

export const getTextStyleKeys = () => Object.keys(textStyles);

export const getTextStyle = (theme: ChakraTheme, key: string): TextStyle => theme?.textStyles?.[key] as TextStyle;
