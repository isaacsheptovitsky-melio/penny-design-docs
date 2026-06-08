import { noop } from '@melio/penny-utils';
import { screen, within } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { AvatarWithDetails } from '../AvatarWithDetails';
import type { AvatarWithDetailsProps } from '../AvatarWithDetails.types';
import { DEFAULT_DATA_TEST_ID } from '../AvatarWithDetails.utils';

const props = { mainLabelProps: { label: 'User Name' }, avatarProps: { name: 'User Name' } };
const description = 'A basic description';
const actionProps = { label: 'Some action', onClick: noop };

describe('AvatarWithDetails', () => {
  validateComponent<AvatarWithDetailsProps>(AvatarWithDetails, 'AvatarWithDetails', {
    props,
    defaultDataTestId: DEFAULT_DATA_TEST_ID,
    componentParts: ['avatar-container', 'avatar', 'label'],
  });

  it('should not render action button when disabled', () => {
    const { queryByText } = renderComponent(
      <AvatarWithDetails {...props} descriptionProps={{ label: description, action: actionProps }} isDisabled />
    );

    expect(queryByText(actionProps.label)).not.toBeInTheDocument();
  });

  it(`should call to 'selectionProps.onSelect' callback`, async () => {
    const onSelect = vi.fn();
    const { user } = renderComponent(
      <AvatarWithDetails
        {...props}
        data-testid="avatar-with-details-unchecked"
        selectionProps={{
          onSelect,
          isSelected: false,
        }}
      />
    );

    const avatarContainer = screen.getByTestId('avatar-with-details-unchecked-avatar-container');

    await user.hover(avatarContainer);
    await user.click(within(avatarContainer).getByRole('checkbox'));

    expect(onSelect).toBeCalled();
  });
});
