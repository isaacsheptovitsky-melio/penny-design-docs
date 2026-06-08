const RADIUS = 42;
const circleAttributes = { cx: 50, cy: 50, r: RADIUS, strokeLinecap: 'round' };

export function useCircleSvg(value: number) {
  const dasharray = Math.PI * RADIUS * 2;
  const determinant = value * (dasharray / 100);
  const strokeDasharray = `${determinant} ${dasharray - determinant}`;

  return { circleAttributes, strokeDasharray };
}
