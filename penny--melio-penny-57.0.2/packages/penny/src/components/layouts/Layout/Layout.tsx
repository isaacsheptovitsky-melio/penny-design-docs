import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Loader } from '@/components/foundations/Loader';
import { Fade } from '@/components/foundations/transitions/Fade';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useFocusManager } from '@/utils';

import type { LayoutProps } from './Layout.types';
import { LayoutMaxWidthDefault } from './Layout.types';

/**
 * `Layout` is used for creating new information and includes:
 * - Multi-column grid or single-column form fields
 * - Clear section headers for complex forms
 * - Action button for completing or canceling the task
 */
export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      maxWidth = LayoutMaxWidthDefault,
      backgroundColor = 'default',
      isLoading,
      header,
      footer,
      children,
      paddingContent,
      'data-testid': dataTestId = 'layout',
      tabIndex,
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('Layout', { maxWidth, isLoading, backgroundColor, paddingContent });
    const getTestId = useTestId(dataTestId);

    const headerComponent = (
      <Box __css={styles['header']} {...getTestId('header')}>
        {header?.content}
      </Box>
    );

    const footerComponent = (
      <Box __css={styles['footer']} {...getTestId('footer')}>
        {footer?.content}
      </Box>
    );

    const loaderRef = useFocusManager<HTMLDivElement>(isLoading);

    return (
      <Box
        {...getTestId()}
        data-component="Layout"
        ref={ref}
        {...props}
        __css={styles['container']}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <Box ref={loaderRef} __css={styles['loadingContainer']}>
            <Loader {...getTestId('loader')} />
          </Box>
        ) : (
          <Fade in={!isLoading} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {header?.isSticky && headerComponent}
            <Box
              __css={styles['contentContainer']}
              /* Scrollable container should be accessible by keyboard */
              /* https://dequeuniversity.com/rules/axe/4.8/scrollable-region-focusable?application=axeAPI */
              tabIndex={tabIndex}
            >
              {header && !header?.isSticky && headerComponent}
              <Box __css={styles['contentWrapper']}>
                <Box __css={styles['content']} {...getTestId('content')}>
                  {children}
                </Box>
              </Box>
              {footer && !footer?.isSticky && footerComponent}
            </Box>
            {footer?.isSticky && footerComponent}
          </Fade>
        )}
      </Box>
    );
  }
);

Layout.displayName = 'Layout';
