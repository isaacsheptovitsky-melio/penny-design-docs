import type { TextFieldProps } from '@/components';

export function getPlaceholder(
  placeholder: TextFieldProps['placeholder'],
  viewModePlaceholder: TextFieldProps['viewModePlaceholder'],
  isViewMode: TextFieldProps['isViewMode'],
  isFormContext: boolean
) {
  const formFieldPlaceholder: string | undefined = viewModePlaceholder ?? placeholder;
  const standalonePlaceholder: string | undefined =
    isViewMode && viewModePlaceholder ? viewModePlaceholder : placeholder;

  return isFormContext ? formFieldPlaceholder : standalonePlaceholder;
}
