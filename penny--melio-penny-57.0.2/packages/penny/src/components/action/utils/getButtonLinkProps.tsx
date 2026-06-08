import { disabledLinkAttributes } from '@/utils/disabledLinkAttributes';

import type { ButtonLinkProps } from '../action.types';

type GetButtonLinkPropsOptions = ButtonLinkProps & { isDisabled?: boolean };
type GetButtonLinkPropsReturnType = typeof disabledLinkAttributes;

export const getButtonLinkProps = ({
  isDisabled,
  link,
}: GetButtonLinkPropsOptions = {}): GetButtonLinkPropsReturnType => ({
  ...(link?.href && { as: 'a', type: undefined }),
  ...(isDisabled && link ? disabledLinkAttributes : link),
});
