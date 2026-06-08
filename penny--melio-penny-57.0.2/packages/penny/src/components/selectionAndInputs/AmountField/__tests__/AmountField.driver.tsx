import { type RenderResult } from '@testing-library/react';
import { type UserEvent } from '@testing-library/user-event';

import { FloatingMenu } from '@/components/containers/menus/FloatingMenu';
import { renderComponent } from '@/test-utils/render.utils';

import { AmountField, AmountFieldEndElement } from '../index';

export const renderAmountFieldWithEndElement = (props: {
  isDisabled?: boolean;
  isReadOnly?: boolean;
}): RenderResult & { user: UserEvent } => {
  const onClick = vi.fn();

  return renderComponent(
    <AmountField
      data-testid="currency-input"
      currencySign="$"
      locale="en-US"
      currency="USD"
      endElement={
        <FloatingMenu
          isOpen={false}
          onOpenChange={onClick}
          isReadOnly={props.isReadOnly}
          isDisabled={props.isDisabled}
          trigger={<AmountFieldEndElement>end element</AmountFieldEndElement>}
          content="children"
        />
      }
    />
  );
};
