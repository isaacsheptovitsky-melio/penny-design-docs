import type { RefCallback } from 'react';

import { Icon } from '@/components/foundations/Icon';
import { Loader } from '@/components/foundations/Loader';
import { InputRightElement } from '@/components/internal/InputRightElement';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { SelectNewOption, SelectNewProps } from '../../../SelectNew.types';

type TriggerRightElementProps<V, O extends SelectNewOption<V>> = {
  isOpen: boolean;
  loadingId?: string;
  refCallback: RefCallback<HTMLElement>;
} & Pick<SelectNewProps<V, O>, 'isDisabled' | 'isReadOnly' | 'isLoading'>;

export const TriggerRightElement = <V, O extends SelectNewOption<V>>({
  isDisabled,
  isReadOnly,
  isLoading,
  isOpen,
  loadingId,
  refCallback,
}: TriggerRightElementProps<V, O>) => {
  const styles = useMultiStyleConfig('SelectNew', {});

  return (
    <InputRightElement
      ref={refCallback}
      data-component="SelectNew.TriggerRightElement"
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

TriggerRightElement.displayName = 'SelectNew.TriggerRightElement';
