import { type ChakraProviderProps } from '@chakra-ui/react';

import { type IconsMap } from '../icons/icon.types';
import { MelioWrapper } from '../MelioWrapper';
import { type ThemeOptions } from '../types';
import { BlanketProvider } from './BlanketProvider';
import { BreakpointProvider } from './BreakpointProvider';
import { IconsProvider } from './IconsProvider';
import { IllustrationsProvider } from './IllustrationsProvider';
import { LoaderProvider } from './LoaderProvider';
import { LogosProvider } from './LogosProvider';
import { SpinnerProvider } from './SpinnerProvider';
import { TokensProvider } from './TokensProvider';

export type ThemeProviderProps = Omit<
  ChakraProviderProps,
  'resetCSS' | 'environment' | 'colorModeManager' | 'portalZIndex' | 'theme'
> & { theme: ThemeOptions };

export const ThemeProvider = ({ theme, cssVarsRoot, children }: ThemeProviderProps) => {
  const {
    textStyles,
    fonts,
    icons,
    colors = {},
    borderRadii = {},
    borders = {},
    logos,
    illustrations,
    loader,
    blanket,
    spinner,
  } = theme;

  return (
    <TokensProvider
      cssVarsRoot={cssVarsRoot ?? 'melio-wrapper'}
      colors={colors}
      borderRadii={borderRadii}
      borders={borders}
      textStyles={textStyles}
      fonts={fonts}
    >
      <BreakpointProvider>
        <IconsProvider icons={icons as IconsMap}>
          <LogosProvider logos={logos}>
            <IllustrationsProvider illustrations={illustrations}>
              <LoaderProvider loader={loader}>
                <SpinnerProvider spinner={spinner}>
                  <BlanketProvider blanket={blanket}>
                    {cssVarsRoot ? children : <MelioWrapper>{children}</MelioWrapper>}
                  </BlanketProvider>
                </SpinnerProvider>
              </LoaderProvider>
            </IllustrationsProvider>
          </LogosProvider>
        </IconsProvider>
      </BreakpointProvider>
    </TokensProvider>
  );
};
