import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';

import { type ButtonSizes, type ButtonVariants } from '@/components/action/Button/Button.types';

type ButtonGroupContextValue = {
  isLoading: boolean;
  isDisabled: boolean;
  size: ButtonSizes;
  variant: ButtonVariants;
};

const ButtonGroupContext = createContext<ButtonGroupContextValue | undefined>(undefined);
function ButtonGroupProvider(props: PropsWithChildren<ButtonGroupContextValue>) {
  const { children, ...context } = props;
  const value = useMemo(
    () => context,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(context)
  ) as ButtonGroupContextValue;
  return <ButtonGroupContext.Provider value={value}>{children}</ButtonGroupContext.Provider>;
}

function useButtonGroupContext() {
  const context = useContext(ButtonGroupContext);

  return context;
}

ButtonGroupContext.displayName = 'ButtonGroupContext';
ButtonGroupProvider.displayName = 'ButtonGroupProvider';

export { ButtonGroupProvider, useButtonGroupContext };
