import { DocsContainer, DocsContainerProps } from '@storybook/addon-docs/blocks';
import { FC } from 'react';
import { IntlProvider } from 'react-intl';

import { PartnerThemeProvider } from '../themes/PartnerThemeProvider';

/**
 * This is to add theme to the docs page according to this
 * https://storybook.js.org/docs/react/writing-docs/autodocs#customize-the-docs-container
 */
export const DSDocsContainer: FC<DocsContainerProps> = ({ children, ...props }) => (
  <DocsContainer {...props}>
    <IntlProvider locale="en" timeZone="UTC">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any */}
      <PartnerThemeProvider theme={(props.context as any).store.userGlobals.globals?.theme as string}>
        {children}
      </PartnerThemeProvider>
    </IntlProvider>
  </DocsContainer>
);
