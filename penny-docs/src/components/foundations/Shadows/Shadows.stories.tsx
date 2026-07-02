import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import {
  FloatingMenu,
  FloatingMenuDropdownList,
  FloatingMenuItem,
} from '@/components/containers/menus/FloatingMenu';
import { shadows } from '@/theme/foundations/shadows';

const meta: Meta = {
  title: 'Foundations/Shadows',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const USE_CASE: Record<string, string> = {
  0: 'No elevation.',
  200: 'Subtle separator / hairline divider.',
  300: 'Upward elevation, e.g. sticky footers.',
  400: 'Low elevation for raised surfaces.',
  500: 'Floating elements — menus and popovers.',
  600: 'Highest elevation for prominent overlays.',
};

export const ShadowTokens: Story = {
  render: () => (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '28px',
        padding: '16px 8px',
        background: '#ffffff',
      }}
    >
      {([0, 200, 300, 400, 500, 600] as (keyof typeof shadows)[]).map((key) => (
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              height: '88px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid #F1F5F8',
              boxShadow: shadows[key] === 'none' ? undefined : shadows[key],
            }}
          />
          <div>
            <div style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '12px', color: '#475569' }}>
              shadow-{key}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.5, marginTop: '2px' }}>{USE_CASE[key]}</div>
            <div style={{ fontSize: '10px', color: '#94A3B8', lineHeight: 1.5, marginTop: '4px', wordBreak: 'break-word' }}>
              {shadows[key]}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};

// ─── Use cases ─────────────────────────────────────────────────────────────────

const UseCaseRow = ({
  token,
  description,
  minHeight = 100,
  paddingTop = 32,
  alignItems = 'center' as const,
  children,
}: {
  token: string;
  description: string;
  minHeight?: number;
  paddingTop?: number;
  alignItems?: 'center' | 'flex-start';
  children: React.ReactNode;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 260px',
      gap: '24px',
      alignItems: 'center',
      padding: '24px 0',
      borderBottom: '1px solid #E2E8F0',
    }}
  >
    <div
      style={{
        background: '#F8F9FA',
        borderRadius: '8px',
        padding: `${paddingTop}px 28px 32px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: alignItems,
        minHeight: `${minHeight}px`,
      }}
    >
      {children}
    </div>
    <div>
      <div style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '13px', color: '#475569' }}>
        {token}
      </div>
      <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', lineHeight: 1.6 }}>{description}</div>
    </div>
  </div>
);

const SelectMenuDemo = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <FloatingMenu
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      width="match-trigger"
      trigger={
        <div
          style={{
            width: '240px',
            height: '40px',
            border: `1px solid ${isOpen ? '#7849ff' : '#D1D5DB'}`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            fontSize: '14px',
            color: '#6B7280',
            background: '#fff',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <span>Select option</span>
          <span style={{ fontSize: '12px', color: '#6B7280' }}>▾</span>
        </div>
      }
      content={
        <FloatingMenuDropdownList>
          <FloatingMenuItem label="Option 1">Option 1</FloatingMenuItem>
          <FloatingMenuItem label="Option 2">Option 2</FloatingMenuItem>
          <FloatingMenuItem label="Option 3">Option 3</FloatingMenuItem>
        </FloatingMenuDropdownList>
      }
    />
  );
};

export const UseCases: Story = {
  render: () => (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '4px' }}>
      {/* shadow-500 — floating menu */}
      <UseCaseRow
        token="shadow-500"
        description="Menus, popovers, and tooltips open over content and use a more prominent shadow to communicate floating elevation."
        minHeight={184}
        paddingTop={28}
        alignItems="flex-start"
      >
        <SelectMenuDemo />
      </UseCaseRow>

      {/* shadow-600 — modal overlay */}
      <UseCaseRow token="shadow-600" description="Modals and high-prominence overlays use the heaviest shadow to clearly separate them from all underlying content.">
        <div
          style={{
            width: '240px',
            padding: '20px',
            borderRadius: '12px',
            background: '#fff',
            boxShadow: shadows[600],
          }}
        >
          <div style={{ height: '14px', width: '52%', borderRadius: '4px', background: '#18191B', marginBottom: '12px' }} />
          <div style={{ height: '9px', width: '90%', borderRadius: '4px', background: '#E2E8F0', marginBottom: '6px' }} />
          <div style={{ height: '9px', width: '70%', borderRadius: '4px', background: '#E2E8F0', marginBottom: '20px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ height: '32px', width: '80px', borderRadius: '6px', background: '#7849ff' }} />
            <div style={{ height: '32px', width: '80px', borderRadius: '6px', border: '1px solid #E2E8F0' }} />
          </div>
        </div>
      </UseCaseRow>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Borders"
        url="/?path=/docs/foundations-borders--docs"
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
            {[1, 2].map((w) => (
              <div
                key={w}
                style={{ height: '24px', borderRadius: '4px', background: '#fff', border: `${w}px solid #18191B` }}
              />
            ))}
          </div>
        }
      />
      <RelatedComponent
        name="Border Radius"
        url="/?path=/docs/foundations-border-radius--docs"
        preview={
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {[0, 4, 8, 9999].map((r) => (
              <div
                key={r}
                style={{ width: '32px', height: '32px', background: '#7849ff', borderRadius: `${r}px` }}
              />
            ))}
          </div>
        }
      />
      <RelatedComponent
        name="Color Tokens"
        url="/?path=/docs/foundations-color-tokens--docs"
        preview={
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {['#7849ff', '#18191B', '#E2E8F0', '#64748B', '#F1F5F8'].map((c) => (
              <div key={c} style={{ width: '20px', height: '20px', borderRadius: '4px', background: c }} />
            ))}
          </div>
        }
      />
    </RelatedComponents>
  ),
};
