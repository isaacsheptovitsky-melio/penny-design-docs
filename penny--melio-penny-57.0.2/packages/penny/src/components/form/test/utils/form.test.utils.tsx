/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-lines */
import { uniqueId } from '@melio/penny-utils';
import { type Args } from '@storybook/react-vite';
import { act, renderHook, type RenderResult, screen, waitFor } from '@testing-library/react';
import { type UserEvent } from '@testing-library/user-event';
import { type ComponentType } from 'react';
import { expect } from 'vitest';

import { Form } from '@/components/form/components/Form';
import { useMelioForm } from '@/components/form/hooks';
import { renderComponent } from '@/test-utils/render.utils';

type PrepareFormFieldResult = RenderResult & {
  input: HTMLElement;
  label: HTMLElement;
  componentName: string;
  errorMessage?: HTMLElement;
  helperText?: HTMLElement;
} & { user: UserEvent };

export const prepareFormField = (Comp: Story, args: Args) => async (): Promise<PrepareFormFieldResult> => {
  const name = uniqueId('field');
  // https://meliorisk.atlassian.net/browse/ME-40355
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const res = renderComponent(<Comp name={name} {...args} />);

  await waitFor(() => expect(res.container).toBeInTheDocument());

  const input = res.getAllByTestId(`form-input-${name}`)[0] as HTMLElement;
  const label = res.getAllByTestId(`form-label-${name}`)[0] as HTMLElement;
  const errorMessage = res.queryAllByTestId(`form-error-message-${name}`)?.[0];
  const helperText = res.queryAllByTestId(`form-helper-text-${name}`)?.[0];
  const componentName = input.getAttribute('data-component') as string;

  return { ...res, input, label, errorMessage, helperText, componentName };
};

// https://meliorisk.atlassian.net/browse/ME-40355
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Story = any;

type TestFormFieldOptions = {
  errorHandlingMessage: string;
};

type TestFormFieldParams = {
  Main: Story;
  Disabled?: Story;
  Invalid?: Story;
  ReadOnly?: Story;
  ViewMode?: Story;
  Required?: Story;
  ShowOptionalIndicator?: Story;
  storyArgs: Args;
};

export function testFormField(
  name: string,
  { Main, Disabled, Invalid, ViewMode, ReadOnly, Required, ShowOptionalIndicator, storyArgs }: TestFormFieldParams,
  { errorHandlingMessage }: TestFormFieldOptions
) {
  describe(`FormField: ${name}`, () => {
    const props = { ...storyArgs, placeholder: 'my placeholder', viewModePlaceholder: 'viewonly placeholder' };

    async function testPlaceHolder(Component: Story, attr: keyof typeof props) {
      const { input, baseElement, componentName } = await prepareFormField(Component, props)();
      const placeholder = props[attr];
      if (input.tagName === 'DIV' && componentName === 'DateFieldDesktopTrigger') {
        expect(input).toHaveTextContent(placeholder);
      } else if (componentName?.endsWith('Select')) {
        expect(baseElement.querySelector('[data-component="SelectPlaceholder"]')).toHaveTextContent(placeholder);
      } else {
        expect(input).toHaveAttribute('placeholder', placeholder);
      }
    }

    Disabled &&
      describe('isDisabled mode', () => {
        // https://meliorisk.atlassian.net/browse/ME-40355
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const renderDisabledMode = prepareFormField(Disabled.render, props);

        it('disables the input', async () => {
          const { input } = await renderDisabledMode();
          try {
            expect(input).toBeDisabled();
          } catch {
            expect(input).toHaveAttribute('aria-disabled');
          }
        });

        it('sets the label as disabled', async () => {
          const { label } = await renderDisabledMode();
          expect(label).toHaveAttribute('aria-disabled');
        });

        it('sets the helperText as disabled', async () => {
          const { helperText } = await renderDisabledMode();
          expect(helperText).toHaveAttribute('aria-disabled');
        });
      });

    ReadOnly &&
      describe('isReadOnly', () => {
        // https://meliorisk.atlassian.net/browse/ME-40355
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const renderReadOnly = prepareFormField(ReadOnly.render, props);

        it('sets the input as read only', async () => {
          const { input } = await renderReadOnly();

          expect(input).toHaveAttribute('readonly');
          // Regression for - https://linear.app/meliopayments/issue/PLA-402/async-select-fix-read-only-design
          expect(input).toBeEnabled();
        });

        it('sets the label as read only', async () => {
          const { label } = await renderReadOnly();
          expect(label).toHaveAttribute('data-readonly', 'true');
        });
      });

    ViewMode &&
      describe('isViewMode', () => {
        // https://meliorisk.atlassian.net/browse/ME-40355
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const renderViewMode = prepareFormField(ViewMode.render, props);

        it('does not show the optional text in the label', async () => {
          const { label } = await renderViewMode();

          expect(label).not.toHaveTextContent('(optional)');
        });

        it('does not show the * text in the label', async () => {
          const { label } = await renderViewMode();

          expect(label).not.toHaveTextContent('*');
        });

        it('hides the helper text', async () => {
          const { helperText } = await renderViewMode();
          expect(helperText).toBeFalsy();
        });
      });

    Required &&
      describe('isRequired mode', () => {
        it('add * next to the label', async () => {
          // eslint-disable-next-line @typescript-eslint/require-await
          await act(async () => {
            // https://meliorisk.atlassian.net/browse/ME-40355
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            renderComponent(<Required.render {...props} />);
          });

          expect(screen.getByTestId('form-label-required')).toHaveTextContent('*');
          expect(screen.getByTestId('form-label-optional')).not.toHaveTextContent('*');
        });
      });

    ShowOptionalIndicator &&
      describe('ShowOptionalIndicator mode', () => {
        it('add (optional) next to the label', async () => {
          // eslint-disable-next-line @typescript-eslint/require-await
          await act(async () => {
            // https://meliorisk.atlassian.net/browse/ME-40355
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            renderComponent(<Required.render {...props} />);
          });

          expect(screen.getByTestId('form-label-optional')).toHaveTextContent('(optional)');
        });
      });
    Invalid &&
      describe('error handling', () => {
        // https://meliorisk.atlassian.net/browse/ME-40355
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const renderErrorMode = prepareFormField(Invalid.render, props);

        it('sets the input as invalid', async () => {
          const { input } = await renderErrorMode();
          expect(input).toHaveAttribute('aria-invalid', 'true');
        });

        it('sets the label as invalid', async () => {
          const { label } = await renderErrorMode();
          expect(label).toHaveAttribute('data-invalid', 'true');
        });

        it('shows the error message', async () => {
          const { errorMessage } = await renderErrorMode();
          expect(errorMessage).toHaveTextContent(errorHandlingMessage);
        });

        it('hides the helper text', async () => {
          const { helperText } = await renderErrorMode();
          expect(helperText).toBeFalsy();
        });
      });

    ViewMode &&
      describe('Placeholder', () => {
        it('sets a placeholder', async () => {
          // https://meliorisk.atlassian.net/browse/ME-40355
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          await testPlaceHolder(Main.render, 'placeholder');
        });

        it('sets a view only placeholder', async () => {
          // https://meliorisk.atlassian.net/browse/ME-40355
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const viewModeField = prepareFormField(ViewMode.render, props);
          const { input } = await viewModeField();
          expect(input).toHaveTextContent(props.viewModePlaceholder);
        });
      });
  });
}

export function testAutoFocus<T>(Comp: ComponentType<T>, props: T, customTestId?: string) {
  describe(`AutoFocus (${Comp.displayName ?? ''})`, () => {
    const testId = customTestId ?? 'focus-test-id';

    it('Focused on page load when autoFocus', async () => {
      renderComponent(<Comp {...props} autoFocus data-testid={customTestId ? undefined : testId} />);
      await waitFor(() => expect(screen.getByTestId(testId)).toHaveFocus());
    });

    it('Not focused on page load when autoFocus false', async () => {
      renderComponent(<Comp {...props} autoFocus={false} data-testid={customTestId ? undefined : testId} />);
      await waitFor(() => expect(screen.getByTestId(testId)).not.toHaveFocus());
    });
  });
}

type TestReadOnlyOptions = {
  isFormField?: boolean;
  customTestIdToGet?: string;
  customTestId?: string;
  attributeToGet?: string;
  skipLabelClick?: boolean;
};

type TestReadOnlyProps<T> = {
  Comp: ComponentType<T>;
  compProps?: T;
  options?: TestReadOnlyOptions;
};

export function testReadOnly<T>({ Comp, compProps = {} as T, options }: TestReadOnlyProps<T>) {
  const {
    isFormField,
    customTestId,
    customTestIdToGet,
    attributeToGet = 'aria-readonly',
    skipLabelClick,
  } = options || {};

  const dataTestId = isFormField
    ? `form-input-${customTestId ?? 'read-only-field'}`
    : (customTestId ?? 'read-only-test-id');

  const testId = customTestIdToGet ?? dataTestId;
  const render = () => {
    if (!isFormField)
      return renderComponent(
        <Comp {...compProps} isReadOnly {...(!customTestIdToGet && { 'data-testid': dataTestId })} />
      );

    const { result } = renderHook(() => useMelioForm({ onSubmit: () => null }));
    const renderResults = renderComponent(
      <Form>
        <Comp
          {...compProps}
          isReadOnly
          {...(!customTestIdToGet && { 'data-testid': dataTestId })}
          labelProps={{ label: 'ReadOnly Label' }}
          {...(result.current.registerField('read-only-field') as T)}
        />
      </Form>
    );

    return {
      formResult: result,
      ...renderResults,
    };
  };

  describe(`ReadOnly (${Comp.displayName ?? ''})`, () => {
    it('has read-only attributes', () => {
      const { getByTestId } = render();
      expect(getByTestId(testId)).toHaveAttribute(attributeToGet, 'true');
    });

    it('focused when using tab by keyboard navigation', async () => {
      const { user, getByTestId } = render();
      await user.tab();
      await waitFor(() => expect(getByTestId(testId)).toHaveFocus());
    });

    it('focused when clicking the field', async () => {
      const { user, getByTestId } = render();
      await user.click(getByTestId(testId));
      await waitFor(() => expect(getByTestId(testId)).toHaveFocus());
    });

    isFormField &&
      !skipLabelClick &&
      it("focused when clicking the field's label", async () => {
        const { user, getByTestId, getByText } = render();
        await user.click(getByText('ReadOnly Label'));
        await waitFor(() => expect(getByTestId(testId)).toHaveFocus());
      });
  });
}
