import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createBaseModalTestKit } from '../BaseModal/createBaseModalTestKit';
import { createButtonTestKit } from '../Button/createButtonTestKit';

export function createModalTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.MODAL }: TestKitProps = {}) {
  const baseModalTestKit = createBaseModalTestKit({ dataTestId });
  const primaryButtonTestKit = createButtonTestKit({ dataTestId: DEFAULT_DATA_TEST_ID.MODAL_PRIMARY_BUTTON });
  const secondaryButtonTestKit = createButtonTestKit({ dataTestId: DEFAULT_DATA_TEST_ID.MODAL_SECONDARY_BUTTON });

  return {
    ...baseModalTestKit,
    primaryButton: primaryButtonTestKit,
    secondaryButton: secondaryButtonTestKit,
  };
}
