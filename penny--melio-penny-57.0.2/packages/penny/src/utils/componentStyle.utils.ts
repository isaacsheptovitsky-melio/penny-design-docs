import { type InternalCSSObject } from '@/theme/types';

type InteractiveStatesOptions = {
  includeFocus?: boolean;
  includeFocusVisible?: boolean;
};

export const applyInteractiveStates = (
  props: InternalCSSObject,
  options?: InteractiveStatesOptions
): InternalCSSObject => {
  const { includeFocus = true, includeFocusVisible = false } = options ?? {};

  const result: InternalCSSObject = {
    ...props,
    '&:hover': props,
  };

  if (includeFocus) {
    (result as Record<string, InternalCSSObject>)['&:focus'] = props;
  }

  if (includeFocusVisible) {
    (result as Record<string, InternalCSSObject>)['&:focus-visible'] = props;
  }

  return result;
};

export const applyAllPressableStates = (props: InternalCSSObject): InternalCSSObject => {
  const base = applyInteractiveStates(props, { includeFocus: false, includeFocusVisible: false });
  return { ...base, '&:active': props };
};

export const applySelectableStates = (props: InternalCSSObject): InternalCSSObject => {
  const base = applyInteractiveStates(props, { includeFocusVisible: false });
  return { ...base, '&:selected': props };
};
