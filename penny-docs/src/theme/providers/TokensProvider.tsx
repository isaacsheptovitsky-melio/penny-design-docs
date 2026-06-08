import { ChakraProvider, type ChakraProviderProps } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

import { extendTheme } from '../theme';
import { type Theme } from '../types';

type TokensProviderBaseProps = RecursivePartial<Theme> & Pick<ChakraProviderProps, 'cssVarsRoot'>;

export type TokensProviderProps = PropsWithChildren<TokensProviderBaseProps>;

export const TokensProvider = ({ children, cssVarsRoot, ...tokens }: TokensProviderProps) => {
  const extendedTheme = extendTheme(tokens);

  // This is the reason for the `portalZIndex` - https://github.com/chakra-ui/chakra-ui/issues/3269#issuecomment-774484028
  return (
    <ChakraProvider resetCSS={false} cssVarsRoot={cssVarsRoot} theme={extendedTheme} portalZIndex={40}>
      {children}
    </ChakraProvider>
  );
};
