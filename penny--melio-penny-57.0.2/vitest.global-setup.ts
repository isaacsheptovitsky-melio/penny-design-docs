export const setup = () => {
  // Based on this time-zone resolution
  // https://github.com/vitest-dev/vitest/issues/1575#issuecomment-1439286286
  process.env['TZ'] = 'UTC';
  process.env['NO_COLOR'] = !!process.env['CI'];
};
