import { defaultDesignTokens } from '../../../packages/penny/src/theme/foundations/tokens/defaultDesignTokens';
import { ThemeOptions } from '../../../packages/penny/src/theme/types';
import { ThemeColorIcon } from './ThemeColorIcon';
import { themes } from './themes';

const getBrandMainColor = (theme: ThemeOptions) =>
  theme?.colors?.global?.brand?.['700'] ?? defaultDesignTokens.colors.global.brand['700']!;

const themesOptions = Object.entries(themes)
  .filter(([key]) => key !== 'default')
  .map(([key, value]) => ({
    value: key,
    title: value.name,
    right: ThemeColorIcon({ color: value.brandColor ?? getBrandMainColor(value.theme) }),
  }));

export const themeSwitcher = {
  name: 'Theme',
  description: 'Change theme',
  toolbar: {
    icon: 'paintbrush',
    dynamicTitle: true,
    title: 'Theme',
    items: [{ value: undefined, title: 'Reset' }, ...themesOptions],
  },
};
