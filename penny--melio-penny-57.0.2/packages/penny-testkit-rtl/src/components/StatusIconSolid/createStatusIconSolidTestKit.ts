import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createBaseIconTestKit } from '../BaseIcon/createBaseIconTestKit';

export const createStatusIconSolidTestKit = ({
  dataTestId = DEFAULT_DATA_TEST_ID.STATUS_ICON_SOLID,
}: TestKitProps = {}) => createBaseIconTestKit({ dataTestId });
