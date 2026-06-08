export const COMPONENTS_DEFAULT_TEST_IDS = {
  ICON: 'icon',
  NAKED_BUTTON: 'naked-button',
  LINK: 'link',
  BRAND: 'brand',
  FLAG_ICON: 'flag-icon',
  STATUS_INDICATOR: 'status-indicator',
  BRAND_SYMBOL: 'brand-symbol',
  ILLUSTRATION: 'illustration',
  PILL: 'pill',
  AVATAR_GROUP: 'avatar-group',
  AVATAR_IMAGE_CONTROL: 'avatar-image-control',
  IFRAME: 'iframe',
  SORT_DROPDOWN_MENU: 'sort-dropdown-menu',
  SELECTABLE_DROPDOWN_MENU: 'selectable-dropdown-menu',
  ACTIONS_DROPDOWN_MENU: 'actions-dropdown-menu',
  FILE_ATTACHMENT: 'file-attachment',
  SWITCH: 'switch',
} as const;

export type ComponentsDefaultTestIdKey = keyof typeof COMPONENTS_DEFAULT_TEST_IDS;
export type ComponentsDefaultTestIdValue = (typeof COMPONENTS_DEFAULT_TEST_IDS)[ComponentsDefaultTestIdKey];
