export function isObject(value: unknown) {
  if (
    (typeof value === 'object' || typeof value === 'function') &&
    value !== null &&
    !Array.isArray(value)
  ) {
    return true;
  }

  return false;
}
