import { BaseSelect as BaseSelectComponent } from './BaseSelect';
import { components } from './components';

export type {
  BaseProps as BaseSelectBaseProps,
  Option as BaseSelectOption,
  Section as BaseSelectSection,
} from './BaseSelect.types';

type BaseSelectType = typeof BaseSelectComponent & typeof components;

export const BaseSelect: BaseSelectType = Object.assign(BaseSelectComponent, components);

export * from './hooks';
