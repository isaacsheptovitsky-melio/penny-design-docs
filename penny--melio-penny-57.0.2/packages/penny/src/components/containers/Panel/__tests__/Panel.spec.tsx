import { Storybook } from 'storybook-utils';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Panel } from '../Panel';
import { type PanelProps } from '../Panel.types';

describe('Panel', () => {
  validateComponent<PanelProps>(Panel, 'Panel', {
    props: {
      children: <Storybook.ContentPlaceholder label="Panel" />,
    },
  });

  it('the panel renders and visible by default', () => {
    const { getByTestId, getByText } = renderComponent(
      <Panel>
        <Storybook.ContentPlaceholder label="Panel" />
      </Panel>
    );
    expect(getByTestId('panel')).toBeInTheDocument();
    expect(getByTestId('panel')).not.toHaveAttribute('aria-hidden');
    expect(getByText('Panel')).toBeInTheDocument();
  });

  describe('when panel has transition', () => {
    it('should render the panel when transitionConfig in is true', () => {
      const transitionConfig = { in: true };
      const { getByTestId } = renderComponent(<Panel transitionConfig={transitionConfig} />);

      expect(getByTestId('panel')).toBeInTheDocument();
    });

    it("shouldn't render the panel when transitionConfig in is false", () => {
      const transitionConfig = { in: false };
      const { queryByTestId } = renderComponent(<Panel transitionConfig={transitionConfig} />);

      expect(queryByTestId('panel')).not.toBeInTheDocument();
    });
  });
});
