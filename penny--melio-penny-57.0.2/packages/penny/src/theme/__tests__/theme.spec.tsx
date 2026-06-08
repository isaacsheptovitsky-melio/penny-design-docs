import { describe, expect } from 'vitest';

import { extendTheme } from '../theme';

describe('extendedTheme', () => {
  describe('Colors', () => {
    it('custom global color when override global token', () => {
      const extendedTheme = extendTheme({
        colors: {
          global: { brand: { 700: 'color' } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['colors'].global.brand['700']).toBe('color');
    });

    it('custom semantic color when override global token', () => {
      const extendedTheme = extendTheme({
        colors: {
          global: { brand: { 700: 'color' } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['colors'].semantic.background.brand.primary).toBe('color');
    });

    it('custom semantic color when override semantic token with global reference', () => {
      const extendedTheme = extendTheme({
        colors: {
          global: { brand: { 100: 'color' } },
          semantic: { background: { brand: { primary: '{global.brand.100}' } } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['colors'].semantic.background.brand.primary).toBe('color');
    });

    it('custom semantic color when override semantic token with custom value', () => {
      const extendedTheme = extendTheme({
        colors: {
          semantic: { background: { brand: { primary: 'color' } } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['colors'].semantic.background.brand.primary).toBe('color');
    });

    it('custom component color when override global token', () => {
      const extendedTheme = extendTheme({
        colors: {
          global: { brand: { 700: 'color' } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['colors'].component.button.textPrimary.hover.label).toEqual('color');
    });

    it('custom component color when override semantic token with custom value', () => {
      const extendedTheme = extendTheme({
        colors: {
          semantic: { text: { brand: { rest: 'color' } } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['colors'].component.button.textPrimary.hover.label).toEqual('color');
    });

    it('custom component color when override semantic token with global reference', () => {
      const extendedTheme = extendTheme({
        colors: {
          global: { brand: { 100: 'color' } },
          semantic: { text: { brand: { rest: '{global.brand.100}' } } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['colors'].component.button.textPrimary.hover.label).toEqual('color');
    });

    it('custom component color when override component token with custom value', () => {
      const extendedTheme = extendTheme({
        colors: {
          component: { button: { textPrimary: { hover: { label: 'color' } } } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['colors'].component.button.textPrimary.hover.label).toEqual('color');
    });

    it('custom component color when override component token with semantic reference', () => {
      const extendedTheme = extendTheme({
        colors: {
          semantic: { text: { primary: 'color' } },
          component: { button: { textPrimary: { hover: { label: '{semantic.text.primary}' } } } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['colors'].component.button.textPrimary.hover.label).toEqual('color');
    });
  });

  describe('Border radii', () => {
    it('custom global border radius when override global token', () => {
      const extendedTheme = extendTheme({
        borderRadii: {
          global: { '100': 'radius' },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['radii'].global['100']).toEqual('radius');
    });

    it('custom semantic border radius when override global token', () => {
      const extendedTheme = extendTheme({
        borderRadii: {
          global: { '200': 'radius' },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['radii'].semantic.action.default).toEqual('radius');
    });

    it('custom semantic border radius when override semantic token with global reference', () => {
      const extendedTheme = extendTheme({
        borderRadii: {
          global: { '100': 'radius' },
          semantic: { action: { default: '{global.100}' } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['radii'].semantic.action.default).toEqual('radius');
    });

    it('custom semantic border radius when override semantic token with custom value', () => {
      const extendedTheme = extendTheme({
        borderRadii: {
          semantic: { action: { default: 'radius' } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['radii'].semantic.action.default).toEqual('radius');
    });

    it('custom component border radius when override global token', () => {
      const extendedTheme = extendTheme({
        borderRadii: {
          global: { full: 'radius' },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['radii'].component.pill.default).toEqual('radius');
    });

    it('custom component border radius when override component token with custom value', () => {
      const extendedTheme = extendTheme({
        borderRadii: {
          component: { pill: { default: 'radius' } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(extendedTheme['radii'].component.pill.default).toEqual('radius');
    });
  });

  describe('Text styles', () => {
    it('custom text styles when override', () => {
      const customTextStyle = { fontFamily: 'Comic Sans MS', fontSize: '12px' };
      const customTextStyles = { heading1Semi: customTextStyle };

      const extendedTheme = extendTheme({
        textStyles: customTextStyles,
      });

      expect(extendedTheme['textStyles']).toEqual(
        expect.objectContaining({ heading1Semi: expect.objectContaining(customTextStyle) as unknown })
      );
    });
  });

  describe('Fonts', () => {
    it('custom font when override', () => {
      const customFonts = { primary: 'Arial' };
      const extendedTheme = extendTheme({
        fonts: customFonts,
      });

      expect(extendedTheme['fonts']).toEqual(expect.objectContaining(customFonts));
    });
  });
});
