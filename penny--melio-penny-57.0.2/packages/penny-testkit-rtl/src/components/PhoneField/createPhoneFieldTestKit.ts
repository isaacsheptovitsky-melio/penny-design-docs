import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createTextFieldTestKit } from '../TextField/createTextFieldTestKit';

export function createPhoneFieldTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.PHONE_FIELD }: TestKitProps = {}) {
  return createTextFieldTestKit({ dataTestId });
}
