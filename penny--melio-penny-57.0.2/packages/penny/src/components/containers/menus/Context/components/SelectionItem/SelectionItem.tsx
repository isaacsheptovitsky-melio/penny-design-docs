import { forwardRef } from 'react';

import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';

import { Group, GroupItem } from '../../../../Group';
import { Item } from '../Item';
import { PresentationCheckbox } from './PresentationCheckbox';
import type { SelectionItemProps } from './SelectionItem.types';

export const SelectionItem = forwardRef<HTMLDivElement, SelectionItemProps>(
  ({ children, isSelected = false, isMulti = false, disabled, ...props }, ref) => {
    return (
      <Item
        data-component="SelectionItem"
        {...props}
        isSelected={isSelected}
        disabled={disabled}
        isMulti={isMulti}
        ref={ref}
      >
        <ConditionalWrapper
          condition={isSelected || isMulti}
          wrapper={(children) => (
            <Group alignItems="center" spacing="s" width="full">
              {children}
            </Group>
          )}
        >
          <>
            {isMulti && <PresentationCheckbox isChecked={isSelected} isDisabled={disabled} />}
            {children}
            <GroupItem grow={1} />
          </>
        </ConditionalWrapper>
      </Item>
    );
  }
);

SelectionItem.displayName = 'SelectionItem';
