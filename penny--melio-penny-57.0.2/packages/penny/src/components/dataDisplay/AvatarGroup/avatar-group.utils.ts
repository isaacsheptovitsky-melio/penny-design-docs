import type { AvatarItemProps } from './AvatarGroup.types';

export const MAX_ITEMS = 4;
const MAX_ITEMS_IN_TOOLTIP = 8;

export const getRestItemsTooltip = (items: AvatarItemProps[]) => {
  if (items.length >= MAX_ITEMS_IN_TOOLTIP) {
    const list = items
      .slice(0, MAX_ITEMS_IN_TOOLTIP)
      .map((item) => item.name)
      .join('\n');

    const footer = `And ${items.slice(MAX_ITEMS_IN_TOOLTIP, items.length).length} Others`;

    return `${list}\n\n${footer}`;
  }

  return items.map((item) => item.name).join('\n');
};
