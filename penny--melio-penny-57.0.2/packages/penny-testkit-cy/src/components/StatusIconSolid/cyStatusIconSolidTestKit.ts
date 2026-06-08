import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createCyBaseIconTestKit } from '../BaseIcon/cyBaseIconTestKit';

export const createCyStatusIconSolidTestKit = ({
  dataTestId = DEFAULT_DATA_TEST_ID.STATUS_ICON_SOLID,
}: TestKitProps = {}) => createCyBaseIconTestKit({ dataTestId });
