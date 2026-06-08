import { type RenderResult } from '@testing-library/react';
import { type UserEvent } from '@testing-library/user-event';
import { type ReactNode } from 'react';

import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { renderComponent } from '@/test-utils/render.utils';

import { BasePopover, BasePopoverBody, type BasePopoverProps } from '..';

export const triggerText = 'Click me!';
export const trigger = triggerText;
export const description = 'I am content';

type Return = Omit<RenderResult, 'rerender'> & {
  user: UserEvent;
  rerender: (props: Partial<BasePopoverProps>) => void;
};

export function renderBasePopover({
  renderer,
  ...props
}: {
  renderer?: (popoverElement: ReactNode) => ReactNode;
} & Partial<BasePopoverProps>): Return {
  function renderInternal(props: Partial<BasePopoverProps>) {
    return (
      <ConditionalWrapper condition={!!renderer} wrapper={(children) => renderer?.(children)}>
        <BasePopover trigger={trigger} {...props}>
          {props.children ?? <BasePopoverBody>{description}</BasePopoverBody>}
        </BasePopover>
      </ConditionalWrapper>
    );
  }

  const { rerender, ...result } = renderComponent(renderInternal(props));

  return {
    ...result,
    rerender: (props: Partial<BasePopoverProps>) => rerender(renderInternal(props)),
  };
}
