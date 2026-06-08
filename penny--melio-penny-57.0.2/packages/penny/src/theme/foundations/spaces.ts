export const themeSpaces = {
  none: '0',
  xxxs: '2px',
  xxs: '4px',
  xs: '8px',
  'xs-s': '12px',
  s: '16px',
  's-m': '20px',
  m: '24px',
  l: '32px',
  xl: '40px',
  xxl: '48px',
  xxxl: '72px',
} as const;

export type ThemeSpaceKey = keyof typeof themeSpaces;

export type SpacingValue =
  | ThemeSpaceKey
  | `${ThemeSpaceKey} ${ThemeSpaceKey}`
  | `${ThemeSpaceKey} ${ThemeSpaceKey} ${ThemeSpaceKey}`
  | `${ThemeSpaceKey} ${ThemeSpaceKey} ${ThemeSpaceKey} ${ThemeSpaceKey}`;

export const getThemeSpacingAsNumber = (key: ThemeSpaceKey) => Number(themeSpaces[key].split('px')[0]);

export const getSpaceValue = (value: string): string => {
  const tokens = value.split(' ') as ThemeSpaceKey[];
  const values = tokens.map((token) => themeSpaces[token] || '0px');
  return values.join(' ');
};

export const themeSpaceKeys = Object.keys(themeSpaces).reduce(
  (res, key) => ({
    ...res,
    [key]: key,
  }),
  {}
) as Record<ThemeSpaceKey, ThemeSpaceKey>;
