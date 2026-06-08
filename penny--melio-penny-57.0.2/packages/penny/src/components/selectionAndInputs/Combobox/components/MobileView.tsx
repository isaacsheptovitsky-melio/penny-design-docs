import { Box } from '@chakra-ui/react';
import { FloatingFocusManager, useFloating, useInteractions, useMergeRefs, useRole } from '@floating-ui/react';
import type { GetTestId } from '@melio/penny-utils';
import type { MouseEvent, NamedExoticComponent, ReactNode, Ref } from 'react';
import { forwardRef, useEffect, useRef } from 'react';

import { NakedButton } from '@/components/action/NakedButton';
import { Group, GroupItem } from '@/components/containers/Group';
import type { MenuContextProps } from '@/components/containers/menus/Context';
import type { DropdownListProps } from '@/components/containers/menus/Context/components/DropdownList';
import { FlatMenu, FlatMenuDropdownList } from '@/components/containers/menus/FlatMenu';
import type { FormFieldContext } from '@/components/form/components/FormField';
import { FormField } from '@/components/form/components/FormField';
import { Blanket } from '@/components/internal/Blanket';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { ComboboxOption, MobileViewProps as _MobileViewProps } from '../Combobox.types';
import type { TriggerProps } from './Trigger';
import { Trigger } from './Trigger';

export type MobileViewProps<V, O extends ComboboxOption<V>> = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerProps: TriggerProps<V, O>;
  getTestId: GetTestId;
  fieldContext?: FormFieldContext;
  content?: ReactNode;
  mobileMenuProps: Pick<
    MenuContextProps,
    | 'aria-label'
    | 'aria-orientation'
    | 'disableTypeahead'
    | 'disableOpenByTriggerClick'
    | 'isVirtualList'
    | 'initialFocus'
    | 'header'
    | 'footer'
    | 'hasItems'
    | 'isOpen'
    | 'isReadOnly'
    | 'isDisabled'
    | 'onOpenChange'
    | 'aria-labelledby'
    | 'role'
    | 'triggerDropdownGap'
  >;
  dropdownListProps: Pick<DropdownListProps, 'as' | 'data-testid' | 'role'>;
} & _MobileViewProps;

const MobileViewComponent = <V, O extends ComboboxOption<V>>(
  {
    isOpen,
    setIsOpen,
    children,
    closeButtonProps,
    triggerProps,
    getTestId,
    fieldContext,
    mobileMenuProps,
    dropdownListProps,
    ...otherProps
  }: MobileViewProps<V, O>,
  ref: Ref<HTMLInputElement>
) => {
  const getMobileEditModeTestId: GetTestId = (...childNames) => getTestId('mobile-edit-mode', ...childNames);
  const getMobileEditModeTriggerContainerTestId: GetTestId = (...childNames) =>
    getMobileEditModeTestId('trigger-container', ...childNames);
  const styles = useMultiStyleConfig('Combobox', {});
  const { refs, context } = useFloating({ open: isOpen, onOpenChange: setIsOpen });
  const { isDisabled, isLoading, isReadOnly, onClick, onInputChange, id: inputId } = triggerProps;
  const isInteractive = !(isDisabled || isLoading || isReadOnly);
  // We use the role of "dialog" when the mobile view can be interacted with, otherwise we use "listbox".
  const role = useRole(context, { role: isInteractive ? 'dialog' : 'listbox' });
  const { getReferenceProps, getFloatingProps } = useInteractions([role]);
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRefs = useMergeRefs([ref, inputRef]);
  const triggerRef = useMergeRefs([refs.setReference, ref]);

  useEffect(() => {
    // We need to explicitly focus the input when the mobile view is opened, using `autoFocus` on the input does not work.
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeButton = (
    <NakedButton
      ref={closeButtonRef}
      label="Back"
      variant="secondary"
      {...getMobileEditModeTestId('close-button')}
      {...closeButtonProps}
      onClick={(event) => {
        setIsOpen(false);
        onInputChange?.('');
        closeButtonProps?.onClick?.(event);
      }}
    />
  );
  // TODO:https://meliorisk.atlassian.net/browse/ME-110373
  // eslint-disable-next-line react-hooks/refs
  const closeButtonElement = closeButtonRef.current;
  const getInsideElements = closeButtonElement ? () => Array.from([closeButtonElement]) : undefined;
  const mobileViewId = `mobile-view-${inputId}`;
  // If the label id is passed explicitly via `labelProps.id` we need to prefix it to match the id used for `aria-labelledby`.
  const mobileViewLabelId = fieldContext?.labelProps?.id && `mobile-view-${fieldContext?.labelProps.id}`;
  return (
    <>
      <Trigger
        {...triggerProps}
        isMobileTrigger={!(isDisabled || isReadOnly)}
        ref={triggerRef}
        {...getReferenceProps({
          onClick: (event: MouseEvent<HTMLInputElement>) => {
            onClick?.(event);

            if (isInteractive) setIsOpen(true);
          },
        })}
      />
      {isOpen && (
        <>
          <Blanket isOpen={isOpen} isFullScreen />

          <FloatingFocusManager context={context}>
            <Box
              data-component="Combobox.MobileView"
              ref={refs.setFloating}
              __css={styles['mobileView']}
              aria-modal="true"
              {...getFloatingProps(otherProps)}
              {...getMobileEditModeTestId()}
            >
              {fieldContext ? (
                <FormField
                  id={mobileViewId}
                  ref={mergedRefs}
                  {...fieldContext}
                  {...(fieldContext.labelProps
                    ? { labelProps: { ...fieldContext.labelProps, id: mobileViewLabelId } }
                    : {})}
                  render={({ ref }) => (
                    <Group width="full" alignItems="center">
                      <GroupItem grow={1}>
                        <FlatMenu
                          {...mobileMenuProps}
                          ref={ref}
                          trigger={
                            <Trigger
                              {...triggerProps}
                              id={mobileViewId}
                              getTestId={getMobileEditModeTriggerContainerTestId}
                            />
                          }
                          content={<FlatMenuDropdownList {...dropdownListProps}>{children}</FlatMenuDropdownList>}
                          getInsideElements={getInsideElements}
                        />
                      </GroupItem>
                      <GroupItem shrink={0}>{closeButton}</GroupItem>
                    </Group>
                  )}
                />
              ) : (
                <Group width="full" alignItems="center">
                  <GroupItem grow={1}>
                    <FlatMenu
                      {...mobileMenuProps}
                      ref={mergedRefs}
                      trigger={<Trigger {...triggerProps} getTestId={getMobileEditModeTriggerContainerTestId} />}
                      content={<FlatMenuDropdownList {...dropdownListProps}>{children}</FlatMenuDropdownList>}
                      getInsideElements={getInsideElements}
                    />
                  </GroupItem>
                  <GroupItem shrink={0}>{closeButton}</GroupItem>
                </Group>
              )}
            </Box>
          </FloatingFocusManager>
        </>
      )}
    </>
  );
};

export const MobileView = forwardRef(MobileViewComponent) as <V, O extends ComboboxOption<V>>(
  props: MobileViewProps<V, O> & { ref?: Ref<HTMLInputElement> }
) => ReturnType<typeof MobileViewComponent>;

(MobileView as NamedExoticComponent).displayName = 'Combobox.MobileView';
