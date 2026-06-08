import { type ComponentPropsWithoutRef } from 'react';

import { useMenuContext } from '@/components/containers/menus/Context';
import { FloatingMenuSelectionItem } from '@/components/containers/menus/FloatingMenu';
import { Tooltip, type TooltipProps } from '@/components/dataDisplay/Tooltip';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';

export type OptionProps = ComponentPropsWithoutRef<typeof FloatingMenuSelectionItem> & {
  tooltipProps?: TooltipProps;
};

export const Option = (props: OptionProps) => {
  const { activeIndex } = useMenuContext();
  const { tooltipProps, ...restProps } = props;

  return (
    <ConditionalWrapper
      condition={!!tooltipProps?.content}
      wrapper={(children) => (
        <Tooltip
          {...(tooltipProps || {})}
          content={tooltipProps?.content || ''}
          // In virtual lists (Combobox), items use active-descendant navigation and don't receive real focus events.
          // That means the tooltip won't open automatically. We force it open when the item is active and tooltip is enabled.
          isOpen={tooltipProps?.isOpen ?? (props.index === activeIndex && tooltipProps?.isEnabled !== false)}
        >
          {children}
        </Tooltip>
      )}
    >
      <FloatingMenuSelectionItem
        data-component="Combobox.Option"
        role="option"
        aria-selected={restProps.isSelected}
        {...restProps}
      />
    </ConditionalWrapper>
  );
};

Option.displayName = 'Combobox.Option';
