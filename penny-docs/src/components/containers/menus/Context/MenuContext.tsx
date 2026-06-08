import { type MenuContextProps } from './types';
import { MenuContext as _MenuContext, useMenu } from './useMenu';

export const MenuContext = ({ onOpenChange, isOpen, isDisabled, isReadOnly, children, ...props }: MenuContextProps) => {
  const menu = useMenu({
    onOpenChange: (open, triggerEvent) => {
      if (isDisabled || isReadOnly) return;
      onOpenChange(open, triggerEvent);
    },
    isOpen: isDisabled || isReadOnly ? false : isOpen,
    isDisabled,
    isReadOnly,
    ...props,
  });

  return <_MenuContext.Provider value={menu}>{children}</_MenuContext.Provider>;
};

MenuContext.displayName = 'MenuContext';
