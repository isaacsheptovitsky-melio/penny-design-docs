import { Box } from '@chakra-ui/react';
import { FloatingList } from '@floating-ui/react';
import { type AriaRole, forwardRef, type KeyboardEventHandler, type ReactNode } from 'react';

import { Divider } from '@/components/dataDisplay/Divider';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { BaseSheet, BaseSheetBody, BaseSheetFooter, BaseSheetHeader } from '../../BaseSheet';
import { Group } from '../../Group';
import { useMenuContext } from '../Context';

type BottomSheetMenuDropdownProps = {
  children?: ReactNode;
  closeButtonAriaLabel?: string;
};

export const BottomSheetMenuDropdown = forwardRef<HTMLDivElement, BottomSheetMenuDropdownProps>(
  ({ closeButtonAriaLabel, ...props }, ref) => {
    const { isOpen, setIsOpen, refs, elementsRef, labelsRef, getFloatingProps, dropdownProps } = useMenuContext();
    const {
      'data-testid': dataTestId,
      'data-component': dataComponent,
      title,
      content,
      footer,
      header,
      role: roleProp,
    } = dropdownProps;

    const styles = useMultiStyleConfig('BottomSheetMenu', {});

    const { onKeyDown, role, ...floatingProps } = getFloatingProps({
      ...props,
      role: roleProp,
      onKeyDown: (e) => {
        e.stopPropagation();
      },
    });
    return (
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/refs
      <Box ref={refs.setFloating} onKeyDown={onKeyDown as KeyboardEventHandler}>
        <BaseSheet
          {...props}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
          onClick={(e) => e.stopPropagation()}
          data-testid={dataTestId}
          data-component={dataComponent}
          ref={ref}
          placement="bottom"
          closeButtonAriaLabel={closeButtonAriaLabel}
        >
          <BaseSheetHeader>
            {header ??
              (title && (
                <Box as="h2" __css={styles['title']}>
                  {title}
                </Box>
              ))}
          </BaseSheetHeader>

          <Box
            as={BaseSheetBody}
            __css={styles['items']}
            role={role as AriaRole}
            data-testid="bottom-sheet-menu-dropdown-list"
            {...floatingProps}
          >
            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
              <Group spacing="none" variant="vertical">
                {content}
                {footer && (
                  <>
                    <Divider role="separator" />
                    <BaseSheetFooter>{footer}</BaseSheetFooter>
                  </>
                )}
              </Group>
            </FloatingList>
          </Box>
        </BaseSheet>
      </Box>
    );
  }
);

BottomSheetMenuDropdown.displayName = 'BottomSheetMenuDropdown';
