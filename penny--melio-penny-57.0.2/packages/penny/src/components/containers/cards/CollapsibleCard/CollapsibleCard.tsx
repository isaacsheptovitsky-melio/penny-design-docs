import { Box } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import {
  type ForwardedRef,
  forwardRef,
  type MouseEvent,
  type NamedExoticComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ActionArea, useActionArea } from '@/components/accessibility/ActionArea';
import { Divider } from '@/components/dataDisplay/Divider';
import { Text } from '@/components/dataDisplay/Text';
import { Typography } from '@/components/dataDisplay/typography';
import { Icon } from '@/components/foundations/Icon';
import { Collapse } from '@/components/foundations/transitions/Collapse';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Group } from '../../Group';
import { InteractiveCard } from '../InteractiveCard';
import {
  type BaseCollapsibleCardProps,
  type CollapsibleCardProps,
  type CollapsibleCardValidateProps,
} from './CollapsibleCard.types';

/**
 * The `CollapsibleCard` based on the InteractiveCard component to provide interactivity.
 */
const CollapsibleCardComponent = (props: CollapsibleCardProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    title,
    description,
    header,
    children,
    disabled = false,
    readOnly = false,
    titleRightElement,
    onClick,
    defaultIsExpanded = false,
    isExpanded,
    onExpandChange,
    'data-testid': dataTestId = 'collapsible-card',
    'aria-label': ariaLabel,
    ...rest
  } = props;
  const styles = useMultiStyleConfig('CollapsibleCard', {});
  const [localIsExpanded, setLocalIsExpanded] = useState<boolean>(Boolean(defaultIsExpanded || isExpanded));
  const isControlled = isExpanded !== undefined;
  const getTestId = useTestId(dataTestId);

  const handleOnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const updatedExpanded = !localIsExpanded;
      onExpandChange?.(updatedExpanded);
      onClick?.(e);
      if (isControlled) return;
      setLocalIsExpanded(updatedExpanded);
    },
    [isControlled, localIsExpanded, onClick, onExpandChange]
  );

  useEffect(() => {
    if (isControlled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalIsExpanded(isExpanded);
    }
  }, [isControlled, isExpanded, localIsExpanded]);

  const cardId = useMemo(() => uniqueId('collapsible-card-'), []);
  const cardContentId = useMemo(() => uniqueId('collapsible-card-content'), []);

  const { containerProps, actionAreaProps } = useActionArea({
    onClick: handleOnClick,
    id: cardId,
    isDisabled: disabled || readOnly,
  });

  const unsupportedProps =
    (readOnly && (defaultIsExpanded || isExpanded)) || (disabled && (defaultIsExpanded || isExpanded));
  if (unsupportedProps) {
    // eslint-disable-next-line no-console
    console.warn("CollapsibleCard: expanded card is not supported when 'readOnly' or 'disabled' are true");
  }

  return (
    <InteractiveCard
      data-component="CollapsibleCard"
      ref={ref}
      paddingX="none"
      paddingY="none"
      disabled={disabled}
      readOnly={readOnly}
      {...(!disabled && !readOnly && { 'data-is-interactive': true })}
      {...getTestId()}
      {...rest}
    >
      <Group variant="vertical" spacing="none" width="full">
        <Box
          __css={styles['header']}
          data-readonly={readOnly || null}
          aria-disabled={disabled || undefined}
          data-state={localIsExpanded ? 'expanded' : 'collapsed'}
          {...containerProps}
          {...getTestId('header')}
        >
          <ActionArea
            {...actionAreaProps}
            aria-label={ariaLabel}
            aria-expanded={localIsExpanded}
            aria-controls={cardContentId}
            disabled={disabled}
            {...getTestId('header-action-area')}
          />
          {header ? (
            <Box __css={styles['customHeader']} data-readonly={readOnly || null} aria-disabled={disabled || undefined}>
              {header}
            </Box>
          ) : (
            <Group variant="vertical" spacing="xxs" width="full">
              <Group spacing="xxs" alignItems="center" justifyContent="space-between">
                <Group spacing="xs" alignItems="center">
                  <Text as="h2" textStyle="heading3Semi" color="inherit">
                    {title}
                  </Text>

                  {titleRightElement && (
                    <Box __css={styles['titleRightElement']} data-readonly={readOnly || null}>
                      {titleRightElement}
                    </Box>
                  )}
                </Group>
                <Icon
                  type={localIsExpanded ? 'chevron-up' : 'chevron-down'}
                  size="large"
                  color="inherit"
                  /* Is used for accessibility reasons to prevent an element from being read by a screen reader. */
                  aria-hidden="true"
                />
              </Group>
              {description && (
                <Typography.Description label={description} isReadOnly={readOnly} isDisabled={disabled} />
              )}
            </Group>
          )}
        </Box>
        <Collapse {...getTestId('collapse')} in={localIsExpanded} id={cardContentId}>
          <Box __css={styles['content']}>
            <Divider />
            {children}
          </Box>
        </Collapse>
      </Group>
    </InteractiveCard>
  );
};

export const CollapsibleCard = forwardRef(CollapsibleCardComponent) as unknown as <T extends BaseCollapsibleCardProps>(
  props: CollapsibleCardValidateProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof CollapsibleCardComponent>;

(CollapsibleCard as NamedExoticComponent).displayName = 'CollapsibleCard';
