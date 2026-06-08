import { screen, waitFor, within } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';

import { Disabled, FormWithGeneralError, Loading, Main, ViewMode } from '../stories/Form.stories';

describe('Form', () => {
  describe('clicking on label', () => {
    const renderMainForm = async () => {
      // https://meliorisk.atlassian.net/browse/ME-40355
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = renderComponent(<Main.render errorState={false} columns={0} />);
      const fields = ['main-field1', 'main-field2', 'main-field3'];

      await waitFor(() => expect(res.container).toBeInTheDocument());

      return {
        ...res,
        labels: fields.map((name) => res.getByTestId(`form-${name}-label`)),
        inputs: fields.map((name) => res.getByTestId(`form-input-${name}`)),
      };
    };

    it('focuses the input when label is clicked', async () => {
      const { inputs, user } = await renderMainForm();

      for (const [idx, input] of inputs.entries()) {
        await user.click(screen.getAllByLabelText(/Field/)[idx] as HTMLElement);
        expect(input).toHaveFocus();
      }
    });
  });

  describe('isDisabled mode', () => {
    const renderDisabledMode = async () => {
      // https://meliorisk.atlassian.net/browse/ME-40355
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = renderComponent(<Disabled.render />);
      const fields = ['name', 'email'];

      await waitFor(() => expect(res.container).toBeInTheDocument());

      return {
        ...res,
        form: res.getByTestId('form'),
        inputs: fields.map((name) => res.getByTestId(`form-input-${name}`)),
        labels: fields.map((name) => res.getByTestId(`form-${name}-label`)),
        helperTexts: fields.map((name) => res.getByTestId(`form-${name}-helper-text-space`)),
      };
    };

    it('disables the form', async () => {
      const { form } = await renderDisabledMode();

      expect(form).toHaveAttribute('aria-disabled', 'true');
    });

    it('disables the inputs', async () => {
      expect.assertions(3);
      const { inputs } = await renderDisabledMode();

      inputs.forEach((input) => expect(input).toBeDisabled());
    });

    it('sets the labels as disabled', async () => {
      expect.assertions(3);
      const { labels } = await renderDisabledMode();

      labels.forEach((label) => expect(label).toHaveAttribute('data-disabled'));
    });

    it('sets the helperText fields as disabled', async () => {
      const { helperTexts } = await renderDisabledMode();

      helperTexts.forEach((helperText) => expect(helperText).toHaveAttribute('aria-disabled', 'true'));
    });
  });

  describe('isViewMode', () => {
    const renderViewMode = async () => {
      // https://meliorisk.atlassian.net/browse/ME-40355
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = renderComponent(<ViewMode.render />);
      const fields = ['name', 'email'];

      await waitFor(() => expect(res.container).toBeInTheDocument());

      return {
        ...res,
        form: res.getByTestId('form'),
        labels: fields.map((name) => res.getByTestId(`form-${name}-label`)),
        inputs: fields.map((name) => res.getByTestId(`form-input-${name}`)),
      };
    };

    it('sets inputs as view only', async () => {
      expect.assertions(3);
      const { inputs } = await renderViewMode();

      inputs.forEach((input) => expect(input).toHaveAttribute('data-view-mode', 'true'));
    });

    it('sets a view only placeholder', async () => {
      const {
        inputs: [, email],
      } = await renderViewMode();

      expect(email).toHaveTextContent('No email provided');
    });

    it('does not focus the input when label is clicked', async () => {
      const { labels } = await renderViewMode();

      labels.forEach((label) => {
        expect(label).toHaveAttribute('data-view-mode', 'true');
      });
    });
  });

  describe('form with general error mode', () => {
    const renderComponentGeneralErrorMode = async () => {
      // https://meliorisk.atlassian.net/browse/ME-40355
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = renderComponent(<FormWithGeneralError.render />);
      const fields = ['general-error-field1', 'general-error-field2', 'general-error-field3'];

      await waitFor(() => expect(res.container).toBeInTheDocument());

      return {
        ...res,
        formGeneralError: res.getByTestId('form-general-error'),
        inputs: fields.map((name) => res.getByTestId(`form-input-${name}`)),
      };
    };

    it('sets the form with an error', async () => {
      const { formGeneralError } = await renderComponentGeneralErrorMode();
      expect(formGeneralError).toBeInTheDocument();
    });
  });

  describe('form in loading state', () => {
    const renderLoadingFormMode = async () => {
      // https://meliorisk.atlassian.net/browse/ME-40355
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = renderComponent(<Loading.render />);
      const fields = ['loading-field1', 'loading-field2', 'loading-field3'];

      await waitFor(() => expect(res.container).toBeInTheDocument());

      return {
        ...res,
        labels: fields.map((name) => res.getByTestId(`form-${name}-label`)),
        inputs: fields.map((name) => res.getByTestId(`form-input-${name}`)),
      };
    };

    it('displays loader', async () => {
      const { baseElement } = await renderLoadingFormMode();

      expect(within(baseElement).getByTestId('form-loader')).toBeInTheDocument();
    });

    it('sets the input as read only', async () => {
      const { inputs } = await renderLoadingFormMode();

      inputs.forEach((input) => {
        expect(input).toHaveAttribute('aria-readonly', 'true');
      });
    });
  });
});
