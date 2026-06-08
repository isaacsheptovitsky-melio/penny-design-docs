import { Box } from '@chakra-ui/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { ExternalLayout } from '../ExternalLayout';

describe('ExternalLayout', () => {
  validateComponent(ExternalLayout, 'ExternalLayout', {
    props: { content: <Box>Content</Box>, footer: <Box>Footer</Box> },
    defaultDataTestId: 'external-layout',
    componentParts: ['fixed-header', 'logo-container', 'content-container'],
  });

  it('should show the logo override', () => {
    const { queryByTestId, getByTestId } = renderComponent(
      <ExternalLayout
        content={<Box>Content</Box>}
        footer={<Box>Footer</Box>}
        logo={<Box data-testid="logo override">Logo override</Box>}
      />
    );
    expect(getByTestId('logo override')).toBeInTheDocument();
    expect(queryByTestId('logo')).not.toBeInTheDocument();
  });
});
