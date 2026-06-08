import { Box } from '@chakra-ui/react';
import { FloatingFocusManager } from '@floating-ui/react';
import { isMobileIOS, useDelayUnmount, useTestId } from '@melio/penny-utils';
import { type AriaAttributes, type ForwardedRef, forwardRef, type NamedExoticComponent } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useHideFromSR } from '@/theme/hooks/useHideFromSR';

import { ConditionalWrapper } from '../../ConditionalWrapper';
import { type UseDropdownMenuPropsReturn } from '../hooks/useDropdownMenuProps';
import { DropdownMenuContent, type DropdownMenuContentProps } from './DropdownMenuContent';

type DropdownMenuProps<T> = AriaAttributes &
  UseDropdownMenuPropsReturn<T>['dropdownMenuProps'] &
  Pick<
    DropdownMenuContentProps<T>,
    'isLoading' | 'loadingStateComponent' | 'creatableOptionComponent' | 'renderOption'
  > & { ignoreElement?: HTMLDivElement | null };

const DropdownMenuComponent = <T,>(
  {
    isOpen,
    x,
    y,
    context,
    ignoreElement = null,
    strategy,
    contentProps,
    isLoading,
    loadingStateComponent,
    creatableOptionComponent,
    renderOption,
    'aria-labelledby': ariaLabelledBy,
    ...props
  }: DropdownMenuProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const styles = useMultiStyleConfig('BaseSelect', { isOpen, x, y, strategy });
  const getTestId = useTestId('base-select');

  // We are using delay on mobile devices to give time to the focus to return to it's place when selecting and closing the dropdown.
  const isMounted = useDelayUnmount({ isOpen });

  useHideFromSR({
    ignoreEl: ignoreElement,
    enable: isMobileIOS() && isOpen,
  });

  const isOpenByCondition = isMobileIOS() ? isMounted : isOpen;

  return (
    // This usage of wrapper is solving an issue on iOS devices, when screen reader focus would get lost after selecting an item from the dropdown.
    <ConditionalWrapper
      condition={isMobileIOS()}
      wrapper={(children) => (
        <FloatingFocusManager context={context} disabled={!isMounted} order={['reference', 'content']}>
          <>{children}</>
        </FloatingFocusManager>
      )}
    >
      <>
        {isOpenByCondition && (
          <Box
            data-component="BaseSelect.DropdownMenu"
            __css={styles['dropdownMenu']}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={ref}
            {...props}
            {...getTestId('dropdown-menu')}
          >
            <DropdownMenuContent
              {...contentProps}
              aria-labelledby={ariaLabelledBy}
              isLoading={isLoading}
              loadingStateComponent={loadingStateComponent}
              creatableOptionComponent={creatableOptionComponent}
              renderOption={renderOption}
            />
          </Box>
        )}
      </>
    </ConditionalWrapper>
  );
};

export const DropdownMenu = forwardRef(DropdownMenuComponent) as <T>(
  props: DropdownMenuProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof DropdownMenuComponent>;

(DropdownMenu as NamedExoticComponent).displayName = 'BaseSelect.DropdownMenu';
