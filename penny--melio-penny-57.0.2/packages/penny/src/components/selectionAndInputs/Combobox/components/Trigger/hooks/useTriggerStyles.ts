import { type BoxProps } from '@chakra-ui/react';
import { useResizeObserver } from '@melio/penny-utils';
import { type RefCallback } from 'react';

import { themeSpaces } from '@/theme/foundations/spaces';
import { input } from '@/theme/utils/form.utils';

import { type ComboboxOption, type ComboboxProps } from '../../../Combobox.types';

type UseTriggerStylesOptions<V, O extends ComboboxOption<V>> = {
  hasCustomValue: boolean;
  showRightElement: boolean;
  showLeftElement: boolean;
} & Pick<ComboboxProps<V, O>, 'size' | 'isLoading'>;

type UseTriggerStylesReturn = {
  styleProps: Pick<BoxProps, 'sx' | 'className' | 'paddingLeft' | 'paddingRight'>;
  refs: {
    rightElement: RefCallback<HTMLDivElement>;
    leftElement: RefCallback<HTMLDivElement>;
  };
};

export const useTriggerStyles = <V, O extends ComboboxOption<V>>({
  hasCustomValue,
  showRightElement,
  showLeftElement,
  size,
}: UseTriggerStylesOptions<V, O>): UseTriggerStylesReturn => {
  const { ref: leftElementRef, width: leftElementWidth = 0 } = useResizeObserver<HTMLDivElement>({
    box: 'border-box',
  });
  const { ref: rightElementRef, width: rightElementWidth = 0 } = useResizeObserver<HTMLDivElement>({
    box: 'border-box',
  });

  return {
    styleProps: {
      sx: {
        // Reuse input styles.
        ...input.field,
        ...(hasCustomValue && {
          '&.small': { minHeight: '40px' },
          '&.large': { minHeight: '48px' },
        }),
        paddingLeft: showLeftElement ? `${leftElementWidth}px` : themeSpaces['xs-s'],
        paddingRight: showRightElement ? `calc(${rightElementWidth}px + ${themeSpaces['s-m']})` : themeSpaces['xs-s'],
      },
      className: size,
    },
    refs: {
      rightElement: rightElementRef,
      leftElement: leftElementRef,
    },
  };
};
