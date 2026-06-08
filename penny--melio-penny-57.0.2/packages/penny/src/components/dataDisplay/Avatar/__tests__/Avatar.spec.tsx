import { fireEvent } from '@testing-library/react';
import { expect } from 'vitest';

import SpongeBob from '@/test/assets/SpongeBob.png';
import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Avatar } from '../Avatar';
import type { AvatarProps } from '../Avatar.types';

const name = 'SpongeBob SquarePants';

validateComponent<AvatarProps>(Avatar, 'Avatar', {
  props: { size: 'extra-small', name, src: SpongeBob },
  defaultDataTestId: 'avatar',
  componentParts: ['content'],
});

describe('Avatar - Component', () => {
  it('uses "{name}" as the default alt text of the avatar image', () => {
    const { getByTestId } = renderComponent(<Avatar name={name} src={SpongeBob} />);

    expect(getByTestId('avatar-image')).toHaveAttribute('alt', name);
  });

  it('uses the provided alt prop when specified', () => {
    const customAlt = 'Custom alt text';
    const { getByTestId } = renderComponent(<Avatar name={name} src={SpongeBob} alt={customAlt} />);

    expect(getByTestId('avatar-image')).toHaveAttribute('alt', customAlt);
  });

  it('shows the initials of the name in case the image fails to load', () => {
    const { getByTestId } = renderComponent(<Avatar name={name} src="b" />);
    fireEvent.error(getByTestId('avatar-image'));

    expect(getByTestId('avatar-initials')).toBeInTheDocument();
  });

  it('renders the avatar disabled', () => {
    const { getByTestId } = renderComponent(<Avatar name={name} isDisabled />);

    expect(getByTestId('avatar-content')).toHaveAttribute('aria-disabled', 'true');
  });

  it('selects the avatar', () => {
    const { getByTestId } = renderComponent(<Avatar name={name} isSelected />);

    expect(getByTestId('avatar-content')).toHaveAttribute('data-selected', 'true');
  });
});
