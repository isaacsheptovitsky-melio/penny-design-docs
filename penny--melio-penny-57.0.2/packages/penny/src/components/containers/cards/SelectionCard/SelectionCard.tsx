import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef, useState } from 'react';

import { NakedButton } from '@/components/action/NakedButton';
import { ListItem } from '@/components/dataDisplay/ListItem';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Container } from '../../Container';
import { Group, GroupItem } from '../../Group';
import { ActionsDropdownMenu } from '../../menus/ActionsDropdownMenu';
import { InteractiveCard } from '../InteractiveCard';
import { SelectionCardActionArea } from './components';
import type { MenuActionsItems, SelectionCardProps } from './SelectionCard.types';

/**
 * A selectable card component that supports various content types and actions.
 * Provides a structured layout for displaying selections with optional left elements, labels, descriptions, and actions.
 */
export const SelectionCard = forwardRef<HTMLDivElement, SelectionCardProps>(
  (
    {
      labelProps,
      descriptionProps,
      mainLabelProps,
      leftElement,
      disabled = false,
      readOnly = false,
      selected,
      onClick,
      action: actionProp,
      menuActions: menuActionsProp,
      'data-testid': dataTestId = 'selection-card',
      'aria-label': ariaLabel,
      ...otherProps
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('SelectionCard', {});
    const getTestId = useTestId(dataTestId);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const action = actionProp && (
      <NakedButton
        variant="secondary"
        size="medium"
        onClick={(e) => {
          e.stopPropagation();
          actionProp.onClick(e);
        }}
        {...getTestId('action')}
        label={actionProp.label}
      />
    );

    const menuActionItems: MenuActionsItems | undefined = menuActionsProp?.items.map((item) => ({
      ...item,
      onClick: () => {
        item.onClick?.();
        setIsMenuOpen(false);
      },
    }));

    const menuActions = menuActionsProp && (
      <ActionsDropdownMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        items={menuActionItems ?? []}
        label="Selection Card Actions"
        size="small"
        triggerAriaLabel={menuActionsProp.triggerAriaLabel ?? 'Selection Card Actions'}
        {...getTestId('menu-actions')}
      />
    );

    const isEnabled = !disabled && !readOnly;
    const shouldRenderActionOrMenuActions = action || menuActions;
    const shouldRenderActionArea = Boolean(
      isEnabled && (shouldRenderActionOrMenuActions || mainLabelProps?.tooltipProps) && onClick
    );
    const clickableProps = shouldRenderActionArea
      ? { 'data-is-interactive': true, 'aria-pressed': undefined }
      : { onClick, 'aria-label': ariaLabel };

    return (
      <InteractiveCard
        data-component="SelectionCard"
        ref={ref}
        selected={selected}
        disabled={disabled}
        readOnly={readOnly}
        {...getTestId()}
        {...clickableProps}
        {...otherProps}
      >
        <Group width="full">
          <ConditionalWrapper
            condition={shouldRenderActionArea}
            wrapper={(children) => (
              <SelectionCardActionArea
                {...getTestId('action-area')}
                onClick={onClick}
                selected={selected}
                disabled={disabled}
                readOnly={readOnly}
                aria-label={ariaLabel}
              >
                {children}
              </SelectionCardActionArea>
            )}
          >
            {leftElement && (
              <GroupItem shrink={0} display="inline-flex">
                <Box __css={styles['leftElement']} {...getTestId('left-element')}>
                  {leftElement}
                </Box>
              </GroupItem>
            )}
            <GroupItem grow={1}>
              <ListItem
                labelProps={labelProps}
                descriptionProps={descriptionProps}
                mainLabelProps={{
                  ...mainLabelProps,
                  variant: 'bold',
                }}
                isDisabled={disabled}
                isReadOnly={readOnly}
                {...getTestId('list-item')}
              />
            </GroupItem>
          </ConditionalWrapper>
          {isEnabled && shouldRenderActionOrMenuActions && (
            <GroupItem shrink={0} position="relative">
              <Container height="full" alignItems="flex-start" overflow="initial">
                {action || menuActions}
              </Container>
            </GroupItem>
          )}
        </Group>
      </InteractiveCard>
    );
  }
);

SelectionCard.displayName = 'SelectionCard';
