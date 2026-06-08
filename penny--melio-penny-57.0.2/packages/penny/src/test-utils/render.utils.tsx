import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import { type Options as UserEventOptions, type UserEvent, userEvent } from '@testing-library/user-event';
import { type ReactElement, type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import { PennyProvider } from '@/theme/providers/PennyProvider';
import type { ThemeOptions } from '@/theme/types';

type Options = RenderOptions & {
  themeOptions?: Partial<ThemeOptions>;
  userEventOptions?: UserEventOptions;
};

type DefaultWrapperProps = {
  children: ReactNode;
};

export const DefaultWrapper = ({ children }: DefaultWrapperProps) => <>{children}</>;

const themeLogos = {
  light: () => <></>,
  dark: () => <></>,
};

export function renderComponent(
  ui: ReactElement,
  { wrapper: Wrapper = DefaultWrapper, ...options }: Options = {}
): RenderResult & { user: UserEvent } {
  const { themeOptions, userEventOptions, ...otherOptions } = options;

  return {
    user: userEvent.setup(userEventOptions),
    ...render(ui, {
      ...otherOptions,
      wrapper: (props) => (
        <Wrapper>
          <IntlProvider locale="en" timeZone="UTC">
            <PennyProvider
              theme={{ logos: themeLogos, ...themeOptions }}
              {...props}
              config={{ InlineSVGComponent: () => <div data-testid="mock-svg-inject" />, cdnUrl: '' }}
            />
          </IntlProvider>
        </Wrapper>
      ),
    }),
  };
}
