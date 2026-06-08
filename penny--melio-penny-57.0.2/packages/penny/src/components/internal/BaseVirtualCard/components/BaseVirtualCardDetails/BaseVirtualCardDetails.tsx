import { Box } from '@chakra-ui/react';
import { useBoolean, useTestId } from '@melio/penny-utils';
import type { MouseEvent } from 'react';
import { forwardRef, isValidElement, useCallback, useEffect, useRef, useState } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { BaseVirtualCardDetailsProps } from './BaseVirtualCardDetails.types';

export const BaseVirtualCardDetails = forwardRef<HTMLDivElement, BaseVirtualCardDetailsProps>(
  (
    {
      label,
      mainLabel,
      onCopy,
      variant = 'default',
      enableCopy = true,
      dataDogPrivacy,
      'data-testid': dataTestId = 'base-virtual-card-details',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('BaseVirtualCardDetails', { variant, enableCopy });
    const [isCopied, setIsCopied] = useState(false);
    const [textIsHover, setTextIsHover] = useBoolean(false);
    const copyTooltipTimeoutRef = useRef<number | null>(null);

    const getTestId = useTestId(dataTestId);

    const copyText = useCallback(
      (e?: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        if (!enableCopy) return;
        if (typeof mainLabel === 'string') {
          void navigator.clipboard.writeText(mainLabel);
        }
        onCopy?.(e);
        setIsCopied(true);

        // Clear the previous timeout (if any)
        if (copyTooltipTimeoutRef.current) {
          clearTimeout(copyTooltipTimeoutRef.current);
        }

        // Set a new timeout to reset the copied state after 2 seconds
        copyTooltipTimeoutRef.current = window.setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      },
      [enableCopy, mainLabel, onCopy]
    );

    // Cleanup pending timeouts when unmounting.
    useEffect(
      () => () => {
        if (copyTooltipTimeoutRef.current) {
          clearTimeout(copyTooltipTimeoutRef.current);
        }
      },
      []
    );

    return (
      <Box ref={ref} data-component="BaseVirtualCardDetails" {...getTestId()} {...props}>
        <Group variant="vertical" spacing="xxs">
          <Box __css={styles['label']} {...getTestId('label')}>
            <Text textStyle="inline" color="inherit" shouldSupportEllipsis>
              {label}
            </Text>
          </Box>
          {isValidElement(mainLabel) ? (
            mainLabel
          ) : (
            <Box
              __css={styles['mainLabel']}
              onMouseOver={setTextIsHover.on}
              onMouseOut={setTextIsHover.off}
              onClick={copyText}
            >
              <Text
                {...getTestId('main-label')}
                shouldSupportEllipsis
                data-dd-privacy={dataDogPrivacy}
                textStyle="inline"
                color="inherit"
              >
                {mainLabel}
              </Text>
              {enableCopy && (
                <Box __css={styles['copyButton']} data-hover={textIsHover || undefined}>
                  <Tooltip content={isCopied ? 'Copied' : 'Copy'} placement="top">
                    <IconButton
                      {...getTestId('copy-button')}
                      onClick={copyText}
                      icon="duplicate-flip"
                      aria-label="copy"
                      size="extra-small"
                      variant={variant === 'inverse' ? 'naked-inverse' : 'naked'}
                    />
                  </Tooltip>
                </Box>
              )}
            </Box>
          )}
        </Group>
      </Box>
    );
  }
);

BaseVirtualCardDetails.displayName = 'BaseVirtualCardDetails';
