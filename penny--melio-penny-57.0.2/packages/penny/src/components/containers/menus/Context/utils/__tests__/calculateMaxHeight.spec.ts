import { describe, expect, it } from 'vitest';

import { calculateMaxHeight } from '../calculateMaxHeight';

describe('calculateMaxHeight', () => {
  const availableHeight = 500;

  it('should return available height when maxHeight is undefined', () => {
    expect(calculateMaxHeight(availableHeight)).toBe(availableHeight);
  });

  it('should handle numeric maxHeight', () => {
    expect(calculateMaxHeight(availableHeight, 300)).toBe(300);
    expect(calculateMaxHeight(availableHeight, 600)).toBe(500);
  });

  it('should handle string maxHeight with px', () => {
    expect(calculateMaxHeight(availableHeight, '300px')).toBe(300);
    expect(calculateMaxHeight(availableHeight, '600px')).toBe(500);
  });

  it('should handle invalid maxHeight values', () => {
    expect(calculateMaxHeight(availableHeight, 'invalid')).toBe(availableHeight);
    expect(calculateMaxHeight(availableHeight, '300')).toBe(300);
    expect(calculateMaxHeight(availableHeight, '')).toBe(availableHeight);
  });
});
