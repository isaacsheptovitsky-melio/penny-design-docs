import { tableHeaderStyles } from '../../shared-styles';
import { AccessibilityCell } from './AccessibilityCell';
import { ComponentNameCell } from './ComponentNameCell';
import { DesignKitLinkCell } from './DesignKitLinkCell';
import { MobileCompatibleCell } from './MobileCompatibleCell';

export type TableHeadProps = {
  hideAccessibilityColumn?: boolean;
  component?: string;
  mobileCompatible?: string;
  designKit?: string;
  // preparations for future use
  accessibility?: string;
};

export const TableHead = ({
  hideAccessibilityColumn = true,
  component = 'Component',
  mobileCompatible = 'Mobile compatible',
  accessibility = 'Accessibility',
  designKit = 'Design Kit (Figma)',
}: TableHeadProps) => (
  <thead style={tableHeaderStyles}>
    <tr>
      <th style={{ textAlign: 'start', width: '100%', maxWidth: '30%' }}>
        <ComponentNameCell headerTitle={component} />
      </th>
      <th style={{ textAlign: 'center' }}>
        <MobileCompatibleCell headerTitle={mobileCompatible} />
      </th>
      {!hideAccessibilityColumn && (
        <th style={{ textAlign: 'center' }}>
          <AccessibilityCell headerTitle={accessibility} />
        </th>
      )}
      <th style={{ textAlign: 'start' }}>
        <DesignKitLinkCell headerTitle={designKit} />
      </th>
    </tr>
  </thead>
);

TableHead.displayName = 'TableHead';
