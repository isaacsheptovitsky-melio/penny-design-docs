export const fonts = {
  primary: 'Poppins, system-ui, sans-serif',
  secondary: 'Poppins, system-ui, sans-serif',
  inherit: 'inherit',
};

export type FontKey = keyof typeof fonts;

export type ThemeFonts = Record<FontKey, string>;
