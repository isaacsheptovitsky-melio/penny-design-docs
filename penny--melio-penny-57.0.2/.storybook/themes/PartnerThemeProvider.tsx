import { PropsWithChildren, useMemo } from 'react';

import { PennyProvider } from '../../packages/penny/src/theme/providers/PennyProvider';
import { ThemeOptions } from '../../packages/penny/src/theme/types';
import { getThemeCache } from '../services/themeCache';
import { defaultTheme } from '../toolbar/theme-switcher/default-theme';
import { isDevelopment, THEMES } from '../toolbar/theme-switcher/themes';

const getStaticTheme = (themeName: string): ThemeOptions => {
  const themeEntry = THEMES[themeName];
  return themeEntry?.theme || defaultTheme;
};

export const PartnerThemeProvider = ({ children, theme }: PropsWithChildren<{ theme: string }>) => {
  const themeConfig = useMemo((): ThemeOptions => {
    if (isDevelopment()) {
      const cachedTheme = getThemeCache(theme);
      if (cachedTheme) {
        return cachedTheme;
      }

      return getStaticTheme(theme);
    } else {
      return getStaticTheme(theme);
    }
  }, [theme]);

  return <PennyProvider theme={themeConfig}>{children}</PennyProvider>;
};
