/**
 * Allows modulus of negative numbers to wrap in reverse
 * Example: wrappingModulus(-1, 4) === 3
 * @param {number} val - the value that will be wrapped
 * @param {number} mod - the number to wrap around
 */
export const wrappingModulus = (val, mod) => {
  return ((val % mod) + mod) % mod
}