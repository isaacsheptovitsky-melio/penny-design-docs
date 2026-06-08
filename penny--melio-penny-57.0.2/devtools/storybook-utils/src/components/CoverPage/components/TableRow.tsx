import { colorPalettes } from '../../shared-styles';
import { AccessibilityCell, AccessibilityType } from './AccessibilityCell';
import { ComponentNameCell, ComponentNameCellType } from './ComponentNameCell';
import { DesignKitLinkCell } from './DesignKitLinkCell';
import { MobileCompatibleCell, MobileCompatibleType } from './MobileCompatibleCell';

export type TableRowProps = {
  component: ComponentNameCellType;
  mobileCompatible: MobileCompatibleType;
  designKitLink: string;
  // preparations for future use
  accessibility?: AccessibilityType;
};

const tableRowStyles = {
  height: '45px',
  backgroundColor: colorPalettes.neutral['100'],
};

export const TableRow = ({ component, mobileCompatible, accessibility, designKitLink }: TableRowProps) => (
  <tr key={component.name} style={tableRowStyles}>
    <td>
      <ComponentNameCell name={component.name} badgeType={component.badgeType} link={component.link} />
    </td>
    <td>
      <MobileCompatibleCell type={mobileCompatible} />
    </td>
    {accessibility && (
      <td>
        <AccessibilityCell type={accessibility} />
      </td>
    )}
    <td>
      <DesignKitLinkCell link={designKitLink} />
    </td>
  </tr>
);

TableRow.displayName = 'TableRow';
