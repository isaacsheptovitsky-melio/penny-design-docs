import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import type { HTMLAttributes, ReactElement } from 'react';
import { forwardRef } from 'react';

import { Loader } from '@/components/foundations/Loader';
import { Logo } from '@/components/foundations/Logo';
import { Fade } from '@/components/foundations/transitions/Fade';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

type ExternalLayoutProps = {
  /** The right side of the header. */
  header?: ReactElement;
  /** The content of the screen. */
  content?: ReactElement;
  /** The footer below the content. */
  footer?: ReactElement;
  /** Not supported - use content prop instead. */
  children?: never;
  /** Determines if the layout is in loading state. @default false */
  isLoading?: boolean;
  /** The element that overrides the logo. */
  logo?: ReactElement;
} & Pick<HTMLAttributes<HTMLDivElement>, 'tabIndex'> &
  TestIdProp;

/**
 * `ExternalLayout` is for external users, and is viewed by customers of our users.
 */
export const ExternalLayout = forwardRef<HTMLDivElement, ExternalLayoutProps>(
  (
    { header, content, footer, isLoading, logo, tabIndex, 'data-testid': dataTestId = 'external-layout', ...props },
    ref
  ) => {
    const styles = useMultiStyleConfig('ExternalLayout', {});
    const defaultLogo = <Logo data-testid="logo" size="large" type="light" />;
    const getTestId = useTestId(dataTestId);

    return (
      <Box __css={styles['container']} data-component="ExternalLayout" {...getTestId()} {...props} ref={ref}>
        {isLoading ? (
          <Loader {...getTestId('loader')} />
        ) : (
          <Fade in style={{ width: 'inherit', height: 'inherit' }}>
            <Box __css={styles['wrapper']} tabIndex={tabIndex}>
              <Box __css={styles['header']} />
              <Box __css={styles['fixedHeader']} {...getTestId('fixed-header')}>
                <Box __css={styles['logoContainer']} {...getTestId('logo-container')}>
                  {logo ?? defaultLogo}
                </Box>
                {header && (
                  <Box __css={styles['headerContainer']} {...getTestId('header-container')}>
                    {header}
                  </Box>
                )}
              </Box>
              <Box __css={styles['contentContainer']} {...getTestId('content-container')}>
                {content}
                {footer}
              </Box>
            </Box>
          </Fade>
        )}
      </Box>
    );
  }
);

ExternalLayout.displayName = 'ExternalLayout';
