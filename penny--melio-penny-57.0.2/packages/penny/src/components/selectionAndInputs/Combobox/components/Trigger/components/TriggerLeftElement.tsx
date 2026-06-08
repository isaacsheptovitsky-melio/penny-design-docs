import type { NamedExoticComponent, ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

import { Icon } from '@/components/foundations/Icon';
import { InputLeftElement } from '@/components/internal/InputLeftElement';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { ComboboxOption, ComboboxProps } from '../../../Combobox.types';

type TriggerLeftElementProps<V, O extends ComboboxOption<V>> = Pick<
  ComboboxProps<V, O>,
  'isDisabled' | 'isReadOnly'
> & {
  leftElement: ReactNode;
};

const TriggerLeftElementComponent = <V, O extends ComboboxOption<V>>(
  { isDisabled, isReadOnly, leftElement }: TriggerLeftElementProps<V, O>,
  ref: Ref<HTMLDivElement>
) => {
  const styles = useMultiStyleConfig('Combobox', {});

  return (
    <InputLeftElement
      ref={ref}
      data-component="Combobox.TriggerLeftElement"
      sx={styles['triggerLeftElement']}
      data-disabled={isDisabled || undefined}
      data-readonly={isReadOnly || undefined}
      aria-hidden
    >
      {leftElement || <Icon type="search" size="small" color="inherit" />}
    </InputLeftElement>
  );
};

export const TriggerLeftElement = forwardRef(TriggerLeftElementComponent) as <V, O extends ComboboxOption<V>>(
  props: TriggerLeftElementProps<V, O> & { ref?: Ref<HTMLDivElement> }
) => ReturnType<typeof TriggerLeftElementComponent>;

(TriggerLeftElement as NamedExoticComponent).displayName = 'Combobox.TriggerLeftElement';
