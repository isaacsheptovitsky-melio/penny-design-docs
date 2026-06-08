import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import type { FC } from 'react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Loader } from '../Loader';
import type { LoaderProps } from '../Loader.types';

const Spinner: FC = () => <ChakraSpinner data-testid="spinner" />;

describe('Loader', () => {
  validateComponent<LoaderProps>(Loader, 'Loader');

  it('can override the loader component from the theme', () => {
    const { getByTestId } = renderComponent(<Loader />, { themeOptions: { loader: Spinner } });

    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
