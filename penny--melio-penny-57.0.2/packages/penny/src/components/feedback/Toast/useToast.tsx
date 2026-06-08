import {
  type SystemProps,
  useToast as useChakraToast,
  type UseToastOptions as ChakraUseToastOptions,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useIcons } from '@/theme/hooks/useIcons';
import { BreakpointProvider, useBreakpoint } from '@/theme/providers/BreakpointProvider';
import { ConfigProvider, useConfig } from '@/theme/providers/ConfigProvider';
import { IconsProvider } from '@/theme/providers/IconsProvider';

import { Toast } from './Toast';

/**
 * @deprecated The `Toast` component isn't accessible. Please use `SectionBanner`.
 */
export type UseToastOptions = Omit<ChakraUseToastOptions, 'variant' | 'status' | 'description' | 'isClosable'> & {
  type: 'success' | 'error' | 'informative';
  action?: { type: 'button' | 'link'; text: string; onAction: (close: () => void) => void };
  closeButtonAriaLabel?: string;
};

/**
 * @deprecated The `Toast` component isn't accessible. Please use `SectionBanner`.
 */
export const useToast = () => {
  const chakraToast = useChakraToast();
  const icons = useIcons();
  const config = useConfig();
  const { isExtraSmallScreen } = useBreakpoint();
  const styles = useMultiStyleConfig('Toast', { isMobile: isExtraSmallScreen } as never);

  const toast = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    ({ action, ...options }: UseToastOptions) => {
      // display 1 toast at a time by closing the last toast before popping a new one
      chakraToast.closeAll();
      chakraToast({
        position: 'top',
        duration: null,
        containerStyle: styles['container'] as SystemProps,
        render: (props) => {
          const actionProps = action
            ? { actionType: action.type, onAction: action.onAction, actionText: action.text }
            : {};

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const toastRef = useRef<HTMLDivElement>(null);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            if (!toastRef.current) {
              return;
            }

            toastRef.current.focus();
          }, [toastRef]);

          return (
            // Re-wrap the toast with the icons provider since it's not being rendered in the root element.
            // (Chakra does it already with the ThemeProvider)
            <ConfigProvider config={config}>
              <BreakpointProvider>
                <IconsProvider icons={icons}>
                  {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
                  <Toast {...props} {...actionProps} {...options} {...chakraToast} ref={toastRef} />
                </IconsProvider>
              </BreakpointProvider>
            </ConfigProvider>
          );
        },
        ...options,
      });
    },
    [chakraToast, config, icons, styles]
  );

  return { toast, closeToast: chakraToast.closeAll };
};
