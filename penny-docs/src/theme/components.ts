// Pruned theme component registry — only registers themes for components vendored into this project.
import {
  _baseBadgeTheme,
  _menuFooterTheme,
  _menuTitleTheme,
  _sectionLabelTheme,
  actionBarTheme,
  baseSheetTheme,
  blanketTheme,
  bottomSheetMenuTheme,
  buttonGroupTheme,
  buttonTheme,
  containerTheme,
  counterTheme,
  dropdownListTheme,
  externalLayoutTheme,
  floatingMenuTheme,
  groupItemTheme,
  groupTheme,
  iconButtonTheme,
  layoutTheme,
  linkTheme,
  loaderTheme,
  loadingContainerTheme,
  spinnerTheme,
  menuItemTheme,
  nakedButtonTheme,
  navigationItemTheme,
  panelTheme,
  sectionBannerTheme,
  currencyTheme,
  splitScreenTheme,
  statusIndicatorTheme,
  tabsTheme,
  tagTheme,
  textTheme,
} from '../components/components.theme';
import { type ComponentMultiStyleConfig, type ComponentSingleStyleConfig } from './component-style-config-types';

const SingleStyleComponents = {
  Group: groupTheme,
  GroupItem: groupItemTheme,
  Text: textTheme,
  ButtonGroup: buttonGroupTheme,
  IconButton: iconButtonTheme,
  Link: linkTheme,
  // Menu spine
  Container: containerTheme,
  DropdownList: dropdownListTheme,
  MenuItem: menuItemTheme,
  _MenuFooter: _menuFooterTheme,
  _MenuTitle: _menuTitleTheme,
  _SectionLabel: _sectionLabelTheme,
  // Navigation components
  NavigationItem: navigationItemTheme,
  Counter: counterTheme,
  _BaseBadge: _baseBadgeTheme,
  // Selection & inputs
  Tag: tagTheme,
};
export type SingleStyleConfigComponents = typeof SingleStyleComponents;

const MultiStyleComponents = {
  Button: buttonTheme,
  Loader: loaderTheme,
  Spinner: spinnerTheme,
  NakedButton: nakedButtonTheme,
  Panel: panelTheme,
  ActionBar: actionBarTheme,
  // Menu spine
  BaseSheet: baseSheetTheme,
  Blanket: blanketTheme,
  BottomSheetMenu: bottomSheetMenuTheme,
  FloatingMenu: floatingMenuTheme,
  LoadingContainer: loadingContainerTheme,
  // Navigation components
  Tabs: tabsTheme,
  // Data display
  SectionBanner: sectionBannerTheme,
  Currency: currencyTheme,
  StatusIndicator: statusIndicatorTheme,
  // Layout components
  Layout: layoutTheme,
  SplitScreen: splitScreenTheme,
  ExternalLayout: externalLayoutTheme,
};
type MultiStyleConfigComponents = typeof MultiStyleComponents;

export const components = {
  ...MultiStyleComponents,
  ...SingleStyleComponents,
};

export type MultiStyleConfigComponentsParts = {
  [Property in keyof MultiStyleConfigComponents]: InferInferComponentMultiStyleParts<
    (typeof MultiStyleComponents)[Property]
  >;
};

export type MultiStyleConfigComponentsProps = {
  [Property in keyof MultiStyleConfigComponents]: InferComponentMultiStyleProps<
    (typeof MultiStyleComponents)[Property]
  >;
};

export type SingleStyleConfigComponentsProps = {
  [Property in keyof typeof SingleStyleComponents]: InferComponentSingleStyleProps<
    (typeof SingleStyleComponents)[Property]
  >;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type InferComponentSingleStyleProps<C extends ComponentSingleStyleConfig<any>> =
  C extends ComponentSingleStyleConfig<infer T> ? T : unknown;

type InferInferComponentMultiStyleParts<C extends ComponentMultiStyleConfig<any, any>> =
  C extends ComponentMultiStyleConfig<infer T, any> ? T : unknown;

type InferComponentMultiStyleProps<C extends ComponentMultiStyleConfig<any, any>> =
  C extends ComponentMultiStyleConfig<any, infer T> ? T : unknown;
