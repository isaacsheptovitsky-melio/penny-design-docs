import type { MouseEventHandler, NamedExoticComponent, Ref } from 'react';
import { forwardRef } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { Loader } from '@/components/foundations/Loader';
import { InputRightElement } from '@/components/internal/InputRightElement';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { ComboboxOption, ComboboxProps } from '../../../Combobox.types';

type TriggerRightElementProps<V, O extends ComboboxOption<V>> = {
  loadingId?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
} & Pick<ComboboxProps<V, O>, 'isLoading'>;

const TriggerRightElementComponent = <V, O extends ComboboxOption<V>>(
  { isLoading, loadingId, onClick, ...otherProps }: TriggerRightElementProps<V, O>,
  ref: Ref<HTMLDivElement>
) => {
  const styles = useMultiStyleConfig('Combobox', { isLoading });

  return (
    <InputRightElement ref={ref} data-component="Combobox.TriggerRightElement" sx={styles['triggerRightElement']}>
      {isLoading ? (
        <Loader id={loadingId} />
      ) : (
        <IconButton onClick={onClick} icon="close" size="extra-small" variant="naked" {...otherProps} />
      )}
    </InputRightElement>
  );
};

export const TriggerRightElement = forwardRef(TriggerRightElementComponent) as <V, O extends ComboboxOption<V>>(
  props: TriggerRightElementProps<V, O> & { ref?: Ref<HTMLDivElement> }
) => ReturnType<typeof TriggerRightElementComponent>;

(TriggerRightElement as NamedExoticComponent).displayName = 'Combobox.TriggerRightElement';
