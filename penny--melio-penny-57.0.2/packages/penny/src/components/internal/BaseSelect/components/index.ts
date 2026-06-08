import { CreatableOption } from './CreatableOption';
import { DropdownMenu } from './DropdownMenu';
import { EmptyState } from './EmptyState';
import { Input } from './Input';
import { LoadingState } from './LoadingState';
import { Option } from './Option';
import { OptionContent } from './OptionContent';
import { Section } from './Section';
import { ToggleButton } from './ToggleButton';
import { TriggerLeftIcon } from './TriggerLeftIcon';
import { TriggerRightIcon } from './TriggerRightIcon';

export type BaseSelectComponents = {
  CreatableOption: typeof CreatableOption;
  DropdownMenu: typeof DropdownMenu;
  EmptyState: typeof EmptyState;
  Input: typeof Input;
  TriggerLeftIcon: typeof TriggerLeftIcon;
  TriggerRightIcon: typeof TriggerRightIcon;
  LoadingState: typeof LoadingState;
  Option: typeof Option;
  OptionContent: typeof OptionContent;
  Section: typeof Section;
  ToggleButton: typeof ToggleButton;
};

export const components: BaseSelectComponents = {
  CreatableOption,
  DropdownMenu,
  EmptyState,
  Input,
  TriggerLeftIcon,
  TriggerRightIcon,
  LoadingState,
  Option,
  OptionContent,
  Section,
  ToggleButton,
};
