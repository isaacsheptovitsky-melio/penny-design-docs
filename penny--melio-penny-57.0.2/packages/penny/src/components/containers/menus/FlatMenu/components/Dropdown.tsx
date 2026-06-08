import { Box } from '@chakra-ui/react';
import { FloatingFocusManager, FloatingList, useMergeRefs } from '@floating-ui/react';
import { useTestId } from '@melio/penny-utils';
import { type AriaRole, forwardRef, type KeyboardEventHandler, type ReactNode } from 'react';

import { Group, GroupItem } from '@/components/containers/Group';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { useMenuContext } from '../../Context';
import { useDropdownHeight } from '../hooks';

export const Dropdown = forwardRef<HTMLDivElement, { children?: ReactNode }>(({ ...props }, propRef) => {
  const { refs, elementsRef, floatingStyles, labelsRef, getFloatingProps, isOpen, context, dropdownProps } =
    useMenuContext();
  const {
    shouldTrapFocus,
    initialFocus,
    getInsideElements,
    'data-component': dataComponent,
    'data-testid': dataTestId = 'flat-menu',
    content,
    header,
    footer,
    hasItems,
    ...restDropdownProps
  } = dropdownProps;
  const getTestId = useTestId(dataTestId);

  const ref = useMergeRefs([refs.setFloating, propRef]);

  const { onKeyDown, role, ...floatingProps } = getFloatingProps({
    ...props,
    onKeyDown: (e) => {
      e.stopPropagation();
    },
  });

  const dropdownHeight = useDropdownHeight(floatingStyles.top);

  const style = useStyleConfig('FlatMenu', { height: dropdownHeight });

  // In case where there are no items, the role of the dropdown is irrelevant.
  // We remove the role so the screen readers would announce any content inside the dropdown in a regular manner.
  const dropdownContentRole = hasItems ? role : undefined;

  return (
    <>
      {isOpen && (
        <FloatingFocusManager
          context={context}
          initialFocus={initialFocus}
          modal={shouldTrapFocus}
          getInsideElements={getInsideElements}
        >
          <Box
            ref={ref}
            __css={{ ...floatingStyles, ...style }}
            data-component={dataComponent}
            {...getTestId()}
            onKeyDown={onKeyDown as KeyboardEventHandler}
            onClick={(e) => e.stopPropagation()}
            {...floatingProps}
            role={dropdownContentRole as AriaRole}
            {...restDropdownProps}
          >
            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
              <Group
                variant="vertical"
                spacing="none"
                hasDivider
                dividerProps={{ role: 'separator' }}
                width="full"
                height="full"
                {...getTestId('container')}
              >
                {header && <GroupItem shrink={0}>{header}</GroupItem>}
                {content}
                {footer && <GroupItem shrink={0}>{footer}</GroupItem>}
              </Group>
            </FloatingList>
          </Box>
        </FloatingFocusManager>
      )}
    </>
  );
});
