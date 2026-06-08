import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Menu } from '../../../Menu';
import { SelectableItem } from '../SelectableItem';
import type { SelectableItemProps } from '../SelectableItem.types';

describe('Menu Selectable Item', () => {
  const triggerComponent = <Button variant="secondary" size="large" label="Button" />;

  validateComponent<SelectableItemProps>(SelectableItem, 'Menu.SelectableItem', {
    props: {
      label: 'test',
      value: 'test',
    },
    wrapper: ({ children }) => (
      <Menu trigger={triggerComponent} isOpen onOpenChange={vi.fn()}>
        {children}
      </Menu>
    ),
    skipRefCheck: true,
  });
});
