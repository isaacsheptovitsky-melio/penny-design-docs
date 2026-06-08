import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { lottieAnimation } from '../__fixtures__/lottie';
import { getLottie } from '../__fixtures__/lottie-with-theme-colors';
import { Lottie } from '../Lottie';

validateComponent(Lottie, 'Lottie', { props: { getter: lottieAnimation }, defaultDataTestId: 'lottie' });

describe('Lottie Animation', () => {
  describe('Rendering', () => {
    it('renders using a Lottie object', () => {
      renderComponent(<Lottie animation={lottieAnimation} />);

      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('renders using a getter function', () => {
      renderComponent(<Lottie animation={getLottie} colors={['global.brand.700', 'global.warning.700']} />);

      expect(document.querySelector('svg')).toBeInTheDocument();
    });
  });
});
