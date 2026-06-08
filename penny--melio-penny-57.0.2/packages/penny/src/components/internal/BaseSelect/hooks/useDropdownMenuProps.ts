import {
  autoUpdate,
  type ExtendedRefs,
  flip,
  size as floatingSize,
  useFloating,
  type UseFloatingReturn,
} from '@floating-ui/react';
import {
  type UseComboboxGetMenuPropsReturnValue,
  type UseComboboxReturnValue,
  type UseSelectReturnValue,
} from 'downshift';
import { type RefObject } from 'react';

import { type BaseProps, type Option, type OptionWithSection } from '../BaseSelect.types';

type UseDropdownMenuPropsOptions<T> = Pick<BaseProps<T>, 'emptyState'> & {
  isOpen: boolean;
  shouldShowCreatableOption?: boolean;
  getMenuProps: UseComboboxReturnValue<Option<T>>['getMenuProps'] | UseSelectReturnValue<Option<T>>['getMenuProps'];
  closeMenu?: UseComboboxReturnValue<Option<T>>['closeMenu'];
  hasSections?: boolean;
  options: Option<T>[] | OptionWithSection<T>[];
};

export type UseDropdownMenuPropsContentProps<T> = Pick<
  UseDropdownMenuPropsOptions<T>,
  'closeMenu' | 'emptyState' | 'hasSections' | 'options' | 'shouldShowCreatableOption'
>;

export type UseDropdownMenuPropsReturn<T> = {
  dropdownMenuProps: Pick<UseFloatingReturn, 'strategy' | 'x' | 'y' | 'context'> & {
    ref?: RefObject<HTMLDivElement>;
    isOpen: boolean;
    contentProps: UseComboboxGetMenuPropsReturnValue & UseDropdownMenuPropsContentProps<T>;
  };
  anchorRef: ExtendedRefs<HTMLElement>['setReference'];
};

export const useDropdownMenuProps = <T>({
  isOpen,
  shouldShowCreatableOption,
  getMenuProps,
  emptyState,
  closeMenu,
  hasSections,
  options,
}: UseDropdownMenuPropsOptions<T>): UseDropdownMenuPropsReturn<T> => {
  const { x, y, strategy, refs, context } = useFloating({
    whileElementsMounted: autoUpdate,
    // This is used instead of a portal to keep the dropdown next to the trigger in the DOM tree.
    strategy: 'fixed',
    middleware: [
      floatingSize({
        apply: ({ rects }) => {
          if (refs.floating.current) {
            Object.assign(refs.floating.current.style, {
              width: `${rects.reference.width}px`,
            });
          }
        },
      }),
      flip(),
    ],
  });

  const dropdownMenuProps = {
    isOpen,
    context,
    x,
    y,
    strategy,
    ref: refs.setFloating,
    // Dropdown menu content props:
    contentProps: {
      // `suppressRefError` was added due to this issue: https://github.com/downshift-js/downshift/issues/1272
      ...getMenuProps({}, { suppressRefError: true }),
      shouldShowCreatableOption,
      emptyState,
      closeMenu,
      hasSections,
      options,
    },
  };

  return {
    anchorRef: refs.setReference,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dropdownMenuProps,
  };
};
