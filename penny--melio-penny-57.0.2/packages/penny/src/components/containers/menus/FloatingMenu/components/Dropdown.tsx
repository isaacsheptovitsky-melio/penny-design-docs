import { FloatingList, useMergeRefs } from '@floating-ui/react';
import { useTestId } from '@melio/penny-utils';
import { type AriaRole, type CSSProperties, forwardRef, type KeyboardEventHandler } from 'react';

import { Group, GroupItem } from '@/components/containers/Group';
import { Floater } from '@/components/internal/Floater';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useMenuContext } from '../../Context';

export const Dropdown = forwardRef<HTMLDivElement>((props, propRef) => {
  const { refs, elementsRef, floatingStyles, labelsRef, getFloatingProps, isOpen, context, dropdownProps } =
    useMenuContext();
  const {
    width,
    maxWidth,
    maxHeight,
    hasItems,
    'data-testid': dataTestId = 'floating-menu-dropdown',
    content,
    header,
    footer,
    shouldTrapFocus,
    initialFocus,
    getInsideElements,
    role: roleProp,
    ...restDropdownProps
  } = dropdownProps;
  const ref = useMergeRefs([refs.setFloating, propRef]);
  const getTestId = useTestId(dataTestId);

  const styles = useMultiStyleConfig('FloatingMenu', {
    width,
    maxWidth,
    maxHeight,
  });

  const { onKeyDown, role, ...floatingProps } = getFloatingProps({
    ...props,
    role: roleProp,
    onKeyDown: (e) => {
      e.stopPropagation();
    },
  });

  // In case where there are no items, the role of the dropdown is irrelevant.
  // We remove the role so the screen readers would announce any content inside the dropdown in a regular manner.
  const dropdownContentRole = hasItems ? role : undefined;

  return (
    <Floater
      focusManagerProps={{ context, modal: shouldTrapFocus, initialFocus, getInsideElements }}
      ref={ref}
      isOpen={isOpen}
      styles={{ ...styles['dropdown'], ...floatingStyles } as CSSProperties}
      {...getTestId()}
      onClick={(e) => e.stopPropagation()}
      {...floatingProps}
      role={dropdownContentRole as AriaRole}
      {...restDropdownProps}
      onKeyDown={onKeyDown as KeyboardEventHandler}
    >
      <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
        <Group
          variant="vertical"
          spacing="none"
          hasDivider
          dividerProps={{ role: 'separator' }}
          width="full"
          {...getTestId('container')}
        >
          {header && <GroupItem shrink={0}>{header}</GroupItem>}
          {content}
          {footer && <GroupItem shrink={0}>{footer}</GroupItem>}
        </Group>
      </FloatingList>
    </Floater>
  );
});
