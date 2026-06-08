import { renderHook } from '@testing-library/react';
import { type FC, type SVGProps } from 'react';
import { expect } from 'vitest';

import { iconSizes } from '../../icons';
import { ThemeProvider } from '../../providers';
import { useIconAsset } from '../useIconAsset';

const TeamSmall: FC<SVGProps<SVGSVGElement>> = () => <></>;
const TeamMedium: FC<SVGProps<SVGSVGElement>> = () => <></>;

describe('useIconAsset', () => {
  const theme = {
    logos: {
      light: () => <></>,
      dark: () => <></>,
    },
    icons: {
      team: { small: TeamSmall, medium: TeamMedium },
    },
  };

  it('returns the small asset is the size is extra-small', () => {
    const { result } = renderHook(() => useIconAsset('team', 'extra-small'), {
      wrapper: (props: object) => <ThemeProvider theme={theme} {...props} />,
    });
    expect(result.current).toEqual(TeamSmall);
  });

  it('returns the small asset if the size is small', () => {
    const { result } = renderHook(() => useIconAsset('team', 'small'), {
      wrapper: (props: object) => <ThemeProvider theme={theme} {...props} />,
    });
    expect(result.current).toEqual(TeamSmall);
  });

  it('returns the small asset if the size is small-medium', () => {
    const { result } = renderHook(() => useIconAsset('team', 'small-medium'), {
      wrapper: (props: object) => <ThemeProvider theme={theme} {...props} />,
    });
    expect(result.current).toEqual(TeamSmall);
  });

  it('returns the medium asset if the size is medium', () => {
    const { result } = renderHook(() => useIconAsset('team', 'medium'), {
      wrapper: (props: object) => <ThemeProvider theme={theme} {...props} />,
    });
    expect(result.current).toEqual(TeamMedium);
  });

  it('returns the medium asset if the size is large', () => {
    const { result } = renderHook(() => useIconAsset('team', 'large'), {
      wrapper: (props: object) => <ThemeProvider theme={theme} {...props} />,
    });
    expect(result.current).toEqual(TeamMedium);
  });

  it('returns the medium asset if the size is extra-large', () => {
    const { result } = renderHook(() => useIconAsset('team', 'extra-large'), {
      wrapper: (props: object) => <ThemeProvider theme={theme} {...props} />,
    });
    expect(result.current).toEqual(TeamMedium);
  });

  it('returns the icon if it has 1 asset', () => {
    const theme = {
      logos: {
        light: () => <></>,
        dark: () => <></>,
      },
      icons: {
        team: TeamSmall,
      },
    };

    for (const size of iconSizes) {
      const { result } = renderHook(() => useIconAsset('team', size), {
        wrapper: (props: object) => <ThemeProvider theme={theme} {...props} />,
      });

      expect(result.current).toEqual(TeamSmall);
    }
  });
});
