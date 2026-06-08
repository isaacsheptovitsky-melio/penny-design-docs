import { noop } from '@melio/penny-utils';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Menu } from '../../../Menu';
import { ActionItem } from '../ActionItem';
import type { ActionItemProps } from '../ActionItem.types';

describe('Menu Action Item', () => {
  const triggerComponent = <Button variant="secondary" size="large" label="Button" />;

  validateComponent<ActionItemProps>(ActionItem, 'Menu.ActionItem', {
    props: {
      label: 'test',
      onClick: noop,
    },
    wrapper: ({ children }) => (
      <Menu trigger={triggerComponent} isOpen onOpenChange={vi.fn()}>
        {children}
      </Menu>
    ),
  });
});
