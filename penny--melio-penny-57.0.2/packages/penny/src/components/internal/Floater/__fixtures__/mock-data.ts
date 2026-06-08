import { type FloatingContext, type FloatingEvents } from '@floating-ui/react';

// Mock context for FloatingFocusManager
const mockEvents: FloatingEvents = {
  emit: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
};

export const mockContext: FloatingContext<Element> = {
  placement: 'bottom',
  strategy: 'absolute',
  middlewareData: {},
  x: 100,
  y: 200,
  isPositioned: true,
  floatingStyles: {
    position: 'absolute',
    top: '200px',
    left: '100px',
  },
  refs: {
    floating: { current: document.createElement('div') },
    domReference: { current: document.createElement('div') },
    reference: { current: document.createElement('div') },
    setReference: vi.fn(),
    setFloating: vi.fn(),
    setPositionReference: vi.fn(),
  },
  elements: {
    floating: document.createElement('div'),
    domReference: document.createElement('div'),
    reference: document.createElement('div'),
  },
  update: vi.fn(),
  open: false,
  onOpenChange: vi.fn(),
  events: mockEvents,
  dataRef: { current: {} },
  nodeId: '',
  floatingId: '',
};
