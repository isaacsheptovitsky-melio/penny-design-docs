import { screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

export const waitForBaseSheetOpenTransitionComplete = async () => {
  const closeButton = await screen.findByTestId('sheet-close-button');

  await waitFor(() => {
    expect(closeButton).toHaveFocus();
  });
};
