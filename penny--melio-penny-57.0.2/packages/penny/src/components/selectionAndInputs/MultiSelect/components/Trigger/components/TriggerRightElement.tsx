import type { RefCallback } from 'react';

import { Icon } from '@/components/foundations/Icon';
import { Loader } from '@/components/foundations/Loader';
import { InputRightElement } from '@/components/internal/InputRightElement';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { MultiSelectOption, MultiSelectProps } from '../../../MultiSelect.types';

type TriggerRightElementProps<V, O extends MultiSelectOption<V>> = {
  isOpen: boolean;
  loadingId?: string;
  refCallback: RefCallback<HTMLElement>;
} & Pick<MultiSelectProps<V, O>, 'isDisabled' | 'isReadOnly' | 'isLoading'>;

export const TriggerRightElement = <V, O extends MultiSelectOption<V>>({
  isDisabled,
  isReadOnly,
  isLoading,
  isOpen,
  loadingId,
  refCallback,
}: TriggerRightElementProps<V, O>) => {
  const styles = useMultiStyleConfig('MultiSelect', {});

  return (
    <InputRightElement
      ref={refCallback}
      data-component="MultiSelect.TriggerRightElement"
      sx={styles['triggerRightElement']}
      data-disabled={isDisabled || isReadOnly || undefined}
    >
      {isLoading ? (
        <Loader id={loadingId} />
      ) : (
        <Icon size="small" type={isOpen ? 'caret-up' : 'caret-down'} color="inherit" aria-hidden />
      )}
    </InputRightElement>
  );
};

TriggerRightElement.displayName = 'MultiSelect.TriggerRightElement';
