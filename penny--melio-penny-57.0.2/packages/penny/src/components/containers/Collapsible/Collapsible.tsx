import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef, type ReactNode, useState } from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { Collapse } from '@/components/foundations/transitions';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Group } from '../Group';

export type CollapsibleProps = {
  /** The main label that is always visible */
  label: string;
  /** Determines the gap between the main label and the icon. If there's a second label, the gap will always be default. If there's no second label, the gap could be default or full (end to end). @default 'default' */
  labelView?: 'default' | 'full';
  /** The second label that is shown when the component is expanded */
  secondaryLabel?: string;
  /** The initial state of Collapsible component */
  defaultIsExpanded?: boolean;
  /** The Collapsible's content that shown when is expanded. */
  children?: ReactNode;
} & TestIdProp;

/**
 * A collapsible container that can expand and collapse to show or hide content.
 */
export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      label,
      secondaryLabel,
      defaultIsExpanded = false,
      labelView = 'default',
      children,
      'data-testid': dataTestId = 'collapsible',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('Collapsible', {});
    const getTestId = useTestId(dataTestId);

    const [isExpanded, setIsExpanded] = useState<boolean>(defaultIsExpanded);

    return (
      <Box data-component="Collapsible" ref={ref} {...getTestId()} {...props}>
        <Group variant="vertical" spacing="s">
          <Box __css={styles['header']}>
            <Box
              __css={styles['labelAndIcon']}
              onClick={() => setIsExpanded((value) => !value)}
              data-full-view={Boolean(labelView === 'full' && !secondaryLabel)}
              as="button"
              // ts-ignore is used due to `type` issues with `<Box/>`.
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              type="button"
              {...getTestId('trigger')}
              // Expanded should be on the expanding parent element.
              // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
              aria-expanded={isExpanded}
            >
              <Text textStyle="inline" color="inherit" shouldSupportEllipsis {...getTestId('label')}>
                {label}
              </Text>
              <Icon type={isExpanded ? 'chevron-up' : 'chevron-down'} size="small" color="inherit" />
            </Box>
            {isExpanded && secondaryLabel && (
              <Box __css={styles['secondaryLabel']}>
                <Text textStyle="inline" color="inherit" shouldSupportEllipsis {...getTestId('secondary-label')}>
                  {secondaryLabel}
                </Text>
              </Box>
            )}
          </Box>
          <Collapse {...getTestId('content')} in={isExpanded}>
            {children}
          </Collapse>
        </Group>
      </Box>
    );
  }
);

Collapsible.displayName = 'Collapsible';
