import { act, screen, within } from '@testing-library/react';
import { expect } from 'vitest';

import { COMPONENTS_DEFAULT_TEST_IDS, renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { MAX_ITEMS } from '../avatar-group.utils';
import { AvatarGroup } from '../AvatarGroup';
import type { AvatarGroupProps, AvatarItemProps } from '../AvatarGroup.types';

const defaultItems: AvatarGroupProps['items'] = [
  { name: 'Mysie Esmeralda' },
  { name: 'Gianna Jeanette', src: '/assets/Gustav.png' },
  { name: 'Berenice Des', bgColor: 'avatar5' },
  { name: 'Segun Adebayo', src: '/assets/SegunAdebayo.jpg' },
  { name: 'Margie Ericka' },
  { name: 'Deonne Vergil' },
  { name: 'Toria Penny' },
  { name: 'Jocelin Alana' },
  { name: 'Talon Emmanuel' },
  { name: 'Esmaralda Julianne' },
  { name: 'Eddy Kamryn' },
  { name: 'Derryl Messiah' },
  { name: 'Torin Amanda' },
  { name: 'Beau Alease' },
  { name: 'Rupert Charity' },
  { name: 'Archibald Gracelynn' },
  { name: 'Porter Sophy' },
];

const twoItems = defaultItems.slice(0, 2);

describe('AvatarGroup', () => {
  validateComponent<AvatarGroupProps>(AvatarGroup, 'AvatarGroup', {
    props: {
      items: defaultItems,
    },
    defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.AVATAR_GROUP,
  });

  it('renders maximum 4 items and a description and tooltip with less than 8 items', async () => {
    const sixItems = defaultItems.slice(0, 6);
    const { user } = renderComponent(<AvatarGroup items={sixItems} />);

    const avatarGroup = screen.getByTestId('avatar-group');
    const restItems = sixItems.slice(MAX_ITEMS, sixItems.length);
    const restItemsLabel = `+${restItems.length}`;

    expect(within(avatarGroup).getAllByTestId(/avatar-group-item-\d+$/).length).toEqual(4);
    expect(within(avatarGroup).getByTestId('avatar-group-description')).toHaveTextContent(restItemsLabel);

    const description = within(avatarGroup).getByTestId('avatar-group-description');
    await act(async () => user.hover(description));

    expect(screen.getByTestId('avatar-group-description')).toHaveAttribute('data-state', 'open');
    expect(screen.getByText(restItems.map((item) => item.name).join(' '))).toBeInTheDocument();
  });

  it('renders maximum 4 items and a description and tooltip with more than 8 items', async () => {
    const { user } = renderComponent(<AvatarGroup items={defaultItems} />);

    const avatarGroup = screen.getByTestId('avatar-group');
    const restItems = defaultItems.slice(MAX_ITEMS, defaultItems.length);
    const restItemsLabel = `+${restItems.length}`;

    expect(within(avatarGroup).getAllByTestId(/avatar-group-item-\d+$/).length).toEqual(4);
    expect(within(avatarGroup).getByTestId('avatar-group-description')).toHaveTextContent(restItemsLabel);

    const description = within(avatarGroup).getByTestId('avatar-group-description');
    await act(async () => user.hover(description));

    expect(screen.getByTestId('avatar-group-description')).toHaveAttribute('data-state', 'open');

    const tooltipRestItemsList = restItems
      .slice(0, 8)
      .map((item) => item.name)
      .join(' ');
    const tooltipFooter = `And ${restItems.slice(8, defaultItems.length).length} Others`;

    expect(screen.getByText(`${tooltipRestItemsList} ${tooltipFooter}`)).toBeInTheDocument();
  });

  it('renders 2 items', () => {
    renderComponent(<AvatarGroup items={twoItems} />);

    const avatarGroup = screen.getByTestId('avatar-group');

    expect(within(avatarGroup).getAllByTestId(/avatar-group-item-\d+$/).length).toEqual(2);
  });

  it(`avatarGroup's item triggers tooltip on hover`, async () => {
    const { user } = renderComponent(<AvatarGroup items={twoItems} />);
    const avatarGroup = screen.getByTestId('avatar-group');

    const firstAvatarItemName = (twoItems[0] as AvatarItemProps).name;

    expect(avatarGroup.firstChild).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByText(firstAvatarItemName)).not.toBeInTheDocument();

    await act(async () => user.hover(screen.getByLabelText(firstAvatarItemName)));

    expect(avatarGroup.firstChild).toHaveAttribute('data-state', 'open');
    expect(screen.getByText(firstAvatarItemName)).toBeInTheDocument();
  });
});
