import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';

import { Text } from '@/components/dataDisplay/Text';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type ComboboxOption, type ComboboxProps, type SelectedOption } from '../../../Combobox.types';

export type TriggerValueProps<V, O extends ComboboxOption<V>> = {
  isMobileTrigger?: boolean;
  selectedOption: SelectedOption<V, O>;
  inputValue: string;
  showInputCaret: boolean;
} & Pick<ComboboxProps<V, O>, 'isDisabled' | 'placeholder' | 'valueRenderer' | 'id'> &
  TestIdProp;

export const TriggerValue = <V, O extends ComboboxOption<V>>({
  isMobileTrigger,
  selectedOption,
  inputValue,
  showInputCaret,
  isDisabled,
  valueRenderer,
  placeholder,
  'data-testid': dataTestId = 'combobox-trigger-value',
  ...otherProps
}: TriggerValueProps<V, O>) => {
  const styles = useMultiStyleConfig('Combobox', {
    isReselect: Boolean(selectedOption && showInputCaret),
    hideValue: Boolean(!isMobileTrigger && inputValue),
  });
  const getTestId = useTestId(dataTestId);

  return (
    <Box
      data-component="Combobox.TriggerValue"
      __css={styles['triggerValue']}
      data-value={selectedOption?.value || undefined}
      {...getTestId()}
      {...otherProps}
    >
      {selectedOption ? (
        (valueRenderer?.(selectedOption) ?? (
          <Text textStyle="inline" color="inherit" shouldSupportEllipsis {...getTestId('label')}>
            {selectedOption.label}
          </Text>
        ))
      ) : (
        <Text
          textStyle="inline"
          color={isDisabled ? 'semantic.text.disabled' : 'semantic.text.secondary'}
          shouldSupportEllipsis
          {...getTestId('placeholder')}
        >
          {placeholder}
        </Text>
      )}
    </Box>
  );
};

TriggerValue.displayName = 'Combobox.TriggerValue';
