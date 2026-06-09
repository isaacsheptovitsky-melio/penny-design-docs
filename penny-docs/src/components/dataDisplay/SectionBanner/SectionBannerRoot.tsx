import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type ReactNode, useMemo } from 'react';

import { Group as _Group } from '@/components/containers/Group';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { DataTestIdContext, type DataTestIdContextValue } from '@/utils/dataTestIdContext';

import { SectionBannerContext, type SectionBannerContextValue, StylesProvider } from './SectionBanner.context';
import type { SectionBannerVariant } from './SectionBanner.types';

const Group = chakra(_Group);

export type SectionBannerRootProps = {
  /**
   * Sets the background color, border color, and default icon according to the variant.
   * @default 'informative'
   */
  variant?: SectionBannerVariant;

  /**
   * Reduces spacing and padding for a more compact banner appearance.
   * @default false
   */
  isCompact?: boolean;

  children: ReactNode | ((props: SectionBannerContextValue) => ReactNode);
} & TestIdProp;

export const SectionBannerRoot = forwardRef<SectionBannerRootProps, 'div'>(
  (
    {
      variant = 'informative',
      isCompact = false,
      children,
      'data-testid': dataTestId = 'section-banner',
      ...restProps
    }: SectionBannerRootProps,
    ref
  ) => {
    const styles = useMultiStyleConfig('SectionBanner', { variant, isCompact });

    const contextValue: SectionBannerContextValue = useMemo(
      () => ({
        variant,
        isCompact,
      }),
      [variant, isCompact]
    );

    const dataTestIdContextValue: DataTestIdContextValue = useMemo(
      () => ({ rootDataTestId: dataTestId }),
      [dataTestId]
    );

    return (
      <SectionBannerContext.Provider value={contextValue}>
        <StylesProvider value={styles}>
          <DataTestIdContext.Provider value={dataTestIdContextValue}>
            <Group
              data-component="SectionBannerRoot"
              ref={ref}
              data-testid={dataTestId}
              spacing="s"
              alignItems="flex-start"
              width="full"
              height="fit-content"
              __css={styles['root']}
              data-type={variant}
              {...restProps}
            >
              {typeof children === 'function' ? children(contextValue) : children}
            </Group>
          </DataTestIdContext.Provider>
        </StylesProvider>
      </SectionBannerContext.Provider>
    );
  }
);

SectionBannerRoot.displayName = 'SectionBannerRoot';
