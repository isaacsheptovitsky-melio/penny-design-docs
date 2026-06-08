import { type RenderOptions, waitFor } from '@testing-library/react';
import { type ComponentType, createRef, type RefObject } from 'react';
import { describe, expect, it } from 'vitest';

import { renderComponent } from '../render.utils';

type Options<P> = {
  skipRefCheck?: boolean;
  skipDataTestId?: { skipOverrideTestId?: boolean };
  wrapper?: RenderOptions['wrapper'];
  props?: P;
  /**
   * The default data-testid attribute to be rendered.<br />
   * If provided, an additional test will verify that the component's `data-testid` attribute includes the defaultDataTestId by default.
   */
  defaultDataTestId?: string;
  /**
   * List of child node names of the component to be rendered and combined with the `data-testid` attribute.<br />
   * If provided, an additional test will verify that the `data-testid` attribute includes both the component name and the child node names.
   */
  componentParts?: string[];
  /**
   * Callback function to be executed before rendering the component.
   * Useful for setting up mocks or other test setup.
   */
  beforeRenderCallback?: () => void;
  /**
   * Callback function to be executed after rendering the component.
   * Useful for interacting with the rendered component / or its children.
   */
  afterRenderCallback?: (res: ReturnType<typeof renderComponent>) => Promise<void>;
  /**
   * Custom validation function for data-component attribute.
   * Useful for components that forward refs to child elements or have complex DOM structures.
   * @param getByTestId - Function to get element by test ID
   * @param testId - The test ID being used
   * @param componentName - The expected component name
   */
  customDataComponentValidation?: (
    getByTestId: (testId: string) => HTMLElement,
    testId: string,
    componentName: string
  ) => void;
};

export function validateComponent<P>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Comp: ComponentType<any>,
  name: string,
  {
    componentParts,
    afterRenderCallback,
    beforeRenderCallback,
    defaultDataTestId,
    skipDataTestId,
    skipRefCheck,
    customDataComponentValidation,
    ...options
  }: Options<P> = {}
) {
  const overrideTestId = 'my-test-id';
  const getDataTestIdProps = (testId?: string) => (testId ? { 'data-testid': testId } : {});

  const render = async (renderProps?: { ref?: RefObject<unknown>; overrideTestId?: string }) => {
    beforeRenderCallback?.();
    const { ref, overrideTestId } = renderProps || {};
    const { wrapper } = options;

    const res = renderComponent(<Comp {...options.props} {...getDataTestIdProps(overrideTestId)} ref={ref} />, {
      wrapper,
    });

    if (afterRenderCallback) {
      await afterRenderCallback(res);
    }

    return res;
  };

  const validateDataTestId = () => {
    if (defaultDataTestId) {
      it('correctly renders the component with the default data-testid attribute', async () => {
        const { getByTestId } = await render();
        expect(getByTestId(defaultDataTestId)).toBeInTheDocument();
      });
    }

    if (defaultDataTestId && componentParts?.length) {
      it('correctly renders component parts with the default data-testid attribute', async () => {
        const { getByTestId } = await render();
        componentParts.forEach((childTestId) => {
          expect(getByTestId(`${defaultDataTestId}-${childTestId}`)).toBeInTheDocument();
        });
      });
    }

    if (!skipDataTestId?.skipOverrideTestId) {
      it('supports passing a data-testid attribute', async () => {
        const { getByTestId } = await render({ overrideTestId });
        expect(getByTestId(overrideTestId)).toBeInTheDocument();
      });
    }

    if (!skipDataTestId?.skipOverrideTestId && componentParts?.length) {
      it('correctly renders component parts with the overridden data-testid attribute', async () => {
        const { getByTestId } = await render({ overrideTestId });
        componentParts.forEach((childTestId) => {
          expect(getByTestId(`${overrideTestId}-${childTestId}`)).toBeInTheDocument();
        });
      });
    }
  };

  describe(`${name} component validation`, () => {
    it(`has a displayName set to "${name}"`, () => {
      expect(Comp.displayName).toEqual(name);
    });

    validateDataTestId();

    it(`has a data-component attribute set to "${name}"`, async () => {
      const { getByTestId } = await render({ overrideTestId });

      if (customDataComponentValidation) {
        customDataComponentValidation(getByTestId, overrideTestId, name);
      } else {
        expect(getByTestId(overrideTestId)).toHaveAttribute('data-component', name);
      }
    });

    if (!skipRefCheck) {
      it('has a forwarding ref', async () => {
        const ref = createRef();
        await render({ ref });

        await waitFor(() => {
          expect(ref.current).toBeTruthy();
        });
      });
    }
  });
}
